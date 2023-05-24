interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={`w-4/5 mx-auto ${className}`}>{children}</div>;
};
