import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';


export const metadata : Metadata = {
  title: "Edit Invoice",
};

// dynamic routes
// what is dynamic route?
// creating routes based on the dynamic data. when we don't know the name of route in advance.
// the dynamic parameter can be accessed using useRouter hook in the client or params props in server components.
// specially used to delete or update the data on database.
 
export default async function Page({params} : {params: {id: string}}) {
  // Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata functions.
  //The dynamic segment can be accessed in the page using params props.
  // params prop is used in dynamic route segments to access id
  // searchParams is used to access query parameters
    const id = params.id;

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ]);


    // this is the way to invoke notFound function
    // this will trigger to show not-found page.
    if (!invoice) {
      // wherever notFound function exists, it will render not-found.tsx. but the not found file must be inside the same route.
      notFound();
    }
   
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}