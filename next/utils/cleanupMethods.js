import React from 'react'

export const cleanupShippingMethods = (remainsMemberIds) => {
  const memberIds = JSON.parse(localStorage.getItem('memberIds') || '[]')

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('shippingMethod_')) {
      const memberId = key.split('_')[1]
      if (!remainsMemberIds.includes(memberId)) {
        localStorage.removeItem(key)
      }
    }
  })
}
