import SideNav from '@/app/ui/dashboard/sidenav';


// layout is a shared peace of ui
// this layout is shared across all the pages within dashboard route automatically

// fundamentals of partial rendering
// Partial rendering means only individual region of the page are updated that are changed
// in next navigation only page component will re render while layout is not, this is called partial rendering


// the childrens are page component inside dashboard route. it's nextjs routing system.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}