export interface CopyTooltipProps {
  children: React.ReactElement<{
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
  }>
  duration?: number
  message?: string
  text: string
}