"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { addCategory, updateCategory } from "@/lib/firebase/db"
import type { Category } from "@/lib/firebase/types"
import { Spinner } from "@/components/ui/spinner"
import { IconPickerDialog } from "@/components/icon-picker-dialog"
import { getIconComponent } from "@/lib/icon-picker"

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  maxOrder: number
}

export function CategoryDialog({ open, onOpenChange, category, maxOrder }: CategoryDialogProps) {
  const [loading, setLoading] = useState(false)
  const [iconPickerOpen, setIconPickerOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    order: maxOrder + 1,
    active: true,
    icon: "",
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        order: category.order,
        active: category.active,
        icon: category.icon || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        order: maxOrder + 1,
        active: true,
        icon: "",
      })
    }
  }, [category, maxOrder])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (category) {
        await updateCategory(category.id, formData)
      } else {
        await addCategory(formData)
      }
      onOpenChange(false)
    } catch (error) {
      console.error("[v0] Error saving category:", error)
    } finally {
      setLoading(false)
    }
  }

  const IconComponent = getIconComponent(formData.icon)

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{category ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icono</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIconPickerOpen(true)}
                  disabled={loading}
                >
                  <IconComponent className="mr-2 h-5 w-5" />
                  {formData.icon || "Seleccionar icono"}
                </Button>
                {formData.icon && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormData({ ...formData, icon: "" })}
                    disabled={loading}
                  >
                    Limpiar
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Orden</Label>
              <Input
                id="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active">Activa</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                disabled={loading}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
                {category ? "Guardar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <IconPickerDialog
        open={iconPickerOpen}
        onOpenChange={setIconPickerOpen}
        selectedIcon={formData.icon}
        onSelectIcon={(icon) => setFormData({ ...formData, icon })}
      />
    </>
  )
}
