'use client'

import type { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

/**
 * Props for the Modal component.
 */
export type ModalProps = {
  /**
   * Modal content to be rendered inside the body.
   */
  children: ReactNode
  /**
   * Controls whether the modal is visible.
   */
  isOpen: boolean
  /**
   * Callback invoked when the modal is requested to close.
   */
  onClose: () => void
}

/**
 * Generic modal component used to display the AI prediction
 * or any other content in a centered overlay.
 *
 * Internally it uses the shadcn/ui Dialog component.
 *
 * @param props - The component props.
 */
const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent
        className="
          max-h-[80vh] max-w-2xl overflow-y-auto
          border border-orange-500/40
          bg-zinc-950 text-zinc-50
          shadow-[0_0_40px_rgba(249,115,22,0.45)]
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-orange-400">
            Análise com IA
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4">{children}</div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="border-orange-500/60 text-orange-400 hover:bg-orange-500 hover:text-zinc-950"
            onClick={onClose}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
