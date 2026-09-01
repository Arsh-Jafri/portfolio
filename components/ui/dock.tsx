"use client"

import React, { PropsWithChildren, useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useAnimationControls } from "framer-motion"
import type { MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  iconMagnificationMobile?: number
  disableMagnification?: boolean
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_MAGNIFICATION_MOBILE = 60
const DEFAULT_DISABLEMAGNIFICATION = false

// Shared by the icon scale and the dock's width so they move in lockstep.
// Damping ratio ~0.74 with a low natural frequency, so the icon eases up over
// ~0.3s with a little follow-through instead of snapping to size.
const DOCK_SPRING = { type: "spring" as const, mass: 1, stiffness: 260, damping: 24 }

// overflow must stay visible: a magnified circle is taller than the dock's
// content box, and clipping it flattens the circle into an oval.
const dockVariants = cva(
  "mx-auto flex h-[80px] w-max items-center justify-center gap-2 sm:gap-3 rounded-3xl border p-2 sm:p-3 backdrop-blur-xl overflow-visible"
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconMagnificationMobile = DEFAULT_MAGNIFICATION_MOBILE,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false)
    // Touch devices synthesise a hover on tap and leave it stuck on the tapped
    // icon, so hover-driven magnification has to be gated on real hover support
    // rather than on viewport width alone.
    const [canHover, setCanHover] = useState(false)

    useEffect(() => {
      if (typeof window === "undefined") return
      const width = window.matchMedia("(max-width: 639px)")
      const hover = window.matchMedia("(hover: hover) and (pointer: fine)")
      const sync = () => {
        setIsMobile(width.matches)
        setCanHover(hover.matches)
      }
      sync()
      width.addEventListener("change", sync)
      hover.addEventListener("change", sync)
      return () => {
        width.removeEventListener("change", sync)
        hover.removeEventListener("change", sync)
      }
    }, [])

    const currentMagnification = isMobile ? iconMagnificationMobile : iconMagnification

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<DockIconProps>(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            size: iconSize,
            magnification: currentMagnification,
            disableMagnification: disableMagnification || !canHover,
            supportsHover: canHover,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  supportsHover?: boolean
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
  isActive?: boolean
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  supportsHover = true,
  className,
  children,
  isActive = false,
  onClick,
  ...props
}: DockIconProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()
  const padding = Math.max(6, size * 0.2)

  // Without hover there is nothing to magnify against, so the selected icon
  // announces itself with a one-shot pulse instead.
  const pulseOnActive = !supportsHover
  const canMagnify = !disableMagnification && magnification > size
  const magnified = canMagnify && isHovered
  // Horizontal room the magnified circle needs on each side of its resting box.
  const overhang = canMagnify ? (magnification - size) / 2 : 0

  // Hover-driven magnification (pointer devices)
  useEffect(() => {
    if (pulseOnActive) return
    controls.start({ scale: magnified ? magnification / size : 1 }, DOCK_SPRING)
  }, [controls, magnified, magnification, size, pulseOnActive])

  // Selection pulse (touch devices): only on a deliberate tap, so scrolling
  // between sections simply moves the circle without any bounce.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (pulseOnActive) {
      controls.start({
        // Pop past the target, dip just under, then settle
        scale: [1, magnification / size, 0.98, 1],
        transition: { duration: 0.42, times: [0, 0.38, 0.7, 1], ease: "easeOut" },
      })
    }
    onClick?.(event)
  }

  return (
    // The wrapper claims the extra width in layout, so the dock's w-max grows and
    // shrinks with the icon. The dock is centre-anchored, so adding `overhang` to
    // both sides widens it by 2x overhang and shifts its left edge left by exactly
    // overhang - which leaves this wrapper sitting still while its neighbours part
    // around it. A hovered icon therefore never moves out from under the cursor.
    <motion.div
      style={{ width: size, height: size }}
      animate={{ marginLeft: magnified ? overhang : 0, marginRight: magnified ? overhang : 0 }}
      transition={DOCK_SPRING}
      className="relative flex flex-shrink-0 items-center justify-center"
    >
      {/* Scale lives on the inner element so the full magnified circle stays
          hoverable; growing about the centre can only ever add area under the
          cursor, never take it away. */}
      <motion.div
        style={{ width: size, height: size, padding }}
        initial={{ scale: 1 }}
        animate={controls}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        className={cn(
          "absolute z-0 flex items-center justify-center rounded-full transition-colors hover:z-10",
          isActive
            ? "bg-accent pill-button"
            : cn("bg-transparent", supportsHover && "hover:bg-white/10"),
          className
        )}
        {...props}
      >
        <motion.div whileTap={{ scale: 1.08 }}>{children}</motion.div>
      </motion.div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
