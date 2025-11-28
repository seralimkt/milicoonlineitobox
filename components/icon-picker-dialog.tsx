"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AVAILABLE_ICONS } from "@/lib/icon-picker"
import { cn } from "@/lib/utils"

interface IconPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedIcon?: string
  onSelectIcon: (icon: string) => void
}

export function IconPickerDialog({ open, onOpenChange, selectedIcon, onSelectIcon }: IconPickerDialogProps) {
  const handleSelect = (iconName: string) => {
    onSelectIcon(iconName)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selecciona un Icono</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-2">
          {Object.entries(AVAILABLE_ICONS).map(([name, Icon]) => (
            <Button
              key={name}
              type="button"
              variant="outline"
              className={cn(
                "h-16 w-full flex flex-col items-center justify-center gap-1 hover:bg-primary/10",
                selectedIcon === name && "bg-primary/20 border-primary",
              )}
              onClick={() => handleSelect(name)}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs truncate w-full">{name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
