"use client"

import type { Order, BrandConfig } from "./firebase/types"
import { formatCurrency } from "./utils"

export const formatOrderForWhatsApp = (order: Order, brandConfig?: BrandConfig | null): string => {
  let message = `🆕 *NUEVO PEDIDO - ${order.orderNumber}*\n\n`
  message += `👤 *Cliente:* ${order.customerName}\n`
  message += `📱 *Teléfono:* ${order.customerPhone}\n`

  const deliveryTypeLabels = {
    pickup: "Recoger en tienda",
    delivery: "Entrega a domicilio",
    table: "Para Mesa",
  }
  message += `📦 *Tipo:* ${deliveryTypeLabels[order.deliveryType]}\n`

  if (order.deliveryType === "delivery" && order.deliveryAddress) {
    message += `📍 *Dirección:* ${order.deliveryAddress}\n`
  }

  if (order.deliveryType === "table" && order.numberOfPeople) {
    message += `👥 *Personas:* ${order.numberOfPeople}\n`
  }

  if (order.paymentMethod) {
    const paymentLabels = {
      cash: "Efectivo",
      transfer: "Transferencia",
      card: "Tarjeta",
    }
    message += `💳 *Pago:* ${paymentLabels[order.paymentMethod]}\n`

    if (order.paymentMethod === "cash" && order.cashAmount) {
      message += `💵 *Paga con:* ${formatCurrency(order.cashAmount)}\n`
      message += `💰 *Cambio:* ${formatCurrency(order.cashAmount - order.total)}\n`
    }

    if (order.paymentMethod === "transfer" && order.paymentProofUrl) {
      message += `✅ *Comprobante de pago enviado*\n`
    }
  }

  message += `\n📋 *Productos:*\n`
  order.items.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} x${item.quantity} - ${formatCurrency(item.price)}\n`
    if (item.selectedVariations && item.selectedVariations.length > 0) {
      item.selectedVariations.forEach((v) => {
        message += `   • ${v.variationName}: ${v.optionName}`
        if (v.price > 0) {
          message += ` (+${formatCurrency(v.price)})`
        }
        message += `\n`
      })
    }
    if (item.notes) {
      message += `   📝 ${item.notes}\n`
    }
  })

  message += `\n💰 *Subtotal:* ${formatCurrency(order.subtotal)}\n`
  if (order.deliveryFee > 0) {
    message += `🚚 *Envío:* ${formatCurrency(order.deliveryFee)}\n`
  }
  message += `💵 *Total:* ${formatCurrency(order.total)}\n`

  if (order.notes) {
    message += `\n📝 *Notas adicionales:* ${order.notes}\n`
  }

  return message
}

export const sendOrderToWhatsApp = (order: Order, phoneNumber: string, brandConfig?: BrandConfig | null): void => {
  const message = formatOrderForWhatsApp(order, brandConfig)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, "_blank")
}
