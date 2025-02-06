"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SuccessDialog } from "./success-dialog"

interface QRScannerDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function QRScannerDialog({ isOpen, onOpenChange }: QRScannerDialogProps) {
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <>
      <Dialog open={isOpen && !showSuccess} onOpenChange={onOpenChange}>
        <DialogContent style={{ borderRadius: 15 }} className="sm:max-w-[425px] border-none rounded-sm bg-[#121315] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-normal text-center">Просканyйте QR-код</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="w-full aspect-[4/3] bg-[#1c1d21] rounded-lg relative">{/* QR Scanner View */}</div>
          </div>
          <div className="flex justify-between gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 bg-[#1c1d21] text-white border-none hover:bg-[#2c2d31] hover:text-white h-12"
              onClick={() => {
                onOpenChange(false)
                setShowSuccess(true)
              }}
            >
              Назад
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessDialog
        isOpen={showSuccess}
        onOpenChange={(open) => {
          setShowSuccess(open)
          if (!open) {
            onOpenChange(false)
          }
        }}
      />
    </>
  )
}

