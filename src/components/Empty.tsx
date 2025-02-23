

interface EmptyProps {
  label: string;
}

export const Empty = ({
  label
}: EmptyProps) => {
  return (
    <div className="h-full p-10 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
      </div>
      <p className="text-muted-foreground text-md text-center pr-12">
        {label}
      </p>
    </div>
  )
}

