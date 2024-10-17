
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata : Metadata = {
  title: "Invoices",
}
 
export default async function Page({
    searchParams,
} : {
    searchParams? : {
        query? : string,
        page? : string
    }
}) {


    // searchParams Props
    // two ways to reading searchParams
    // first one is using useSearchParams() hook, used for client side
    // second one is using searchParams props, used for server side code.


    
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    // only this data fetches is not down to the component because the component use this data is client component.
    // instead of fetching the data in client component, fetch the data on server and then pass them a prop.
    const totalPages = await fetchInvoicesPages(query);


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* the best practices is to wrap the search component in to the suspense because it using useSearchParams */}
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}