"use client"

import React, { PropsWithChildren, useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
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
const DEFAULT_MAGNIFICATION_MOBILE = 80
const DEFAULT_DISABLEMAGNIFICATION = false

// Shared by the icon scale and the dock's width so they move in lockstep
const DOCK_SPRING = { type: "spring" as const, mass: 0.1, stiffness: 150, damping: 12 }

const dockVariants = cva(
  "mx-auto flex h-[80px] w-max items-center justify-center gap-2 sm:gap-3 rounded-3xl border p-2 sm:p-3 backdrop-blur-xl overflow-hidden"
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

    useEffect(() => {
      if (typeof window === "undefined") return
      const checkMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 639px)").matches)
      }
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const currentMagnification = isMobile ? iconMagnificationMobile : iconMagnification
    const currentDisableMagnification = isMobile ? true : disableMagnification

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
            disableMagnification: currentDisableMagnification,
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
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
  isActive?: boolean
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  className,
  children,
  isActive = false,
  ...props
}: DockIconProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const padding = Math.max(6, size * 0.2)

  const canMagnify = !disableMagnification && magnification > size
  const active = canMagnify && isHovered
  // Horizontal room the magnified circle needs on each side of its resting box.
  const overhang = canMagnify ? (magnification - size) / 2 : 0

  return (
    // The wrapper claims the extra width in layout, so the dock's w-max grows and
    // shrinks with the icon. The dock is centre-anchored, so adding `overhang` to
    // both sides widens it by 2x overhang and shifts its left edge left by exactly
    // overhang - which leaves this wrapper sitting still while its neighbours part
    // around it. A hovered icon therefore never moves out from under the cursor.
    <motion.div
      style={{ width: size, height: size }}
      animate={{ marginLeft: active ? overhang : 0, marginRight: active ? overhang : 0 }}
      transition={DOCK_SPRING}
      className="relative flex flex-shrink-0 items-center justify-center"
    >
      {/* Scale lives on the inner element so the full magnified circle stays
          hoverable; growing about the centre can only ever add area under the
          cursor, never take it away. */}
      <motion.div
        style={{ padding }}
        animate={{ scale: active ? magnification / size : 1 }}
        transition={DOCK_SPRING}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "absolute inset-0 z-0 flex aspect-square cursor-pointer items-center justify-center rounded-full transition-colors hover:z-10",
          isActive ? "bg-accent pill-button" : "bg-transparent hover:bg-white/10",
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
