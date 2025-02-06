interface EmptyStateBlockProps {
  title: string
  renderIcon: (props: { className: string }) => React.ReactNode
}

export const EmptyStateBlock = (props: EmptyStateBlockProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center w-full h-full">
      <div className="text-gray-400 mb-4">{props.renderIcon({ className: 'size-24' })}</div>
      <h3 className="text-lg font-medium text-gray-900">{props.title}</h3>
    </div>
  )
}
