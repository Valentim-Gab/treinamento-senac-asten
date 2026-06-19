import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './modal-main.css'

export default function ModalMain({
  title,
  children,
  handleClose,
}: {
  title: string
  children: React.ReactNode
  handleClose?: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={handleClose}>
            ✕
          </button>
        </header>

        <main className="modal-content">{children}</main>
      </div>
    </div>,
    document.body,
  )
}
