
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-5 mx-auto lg:px-10 xl:px-15">
      {children}
    </div>
  );
}