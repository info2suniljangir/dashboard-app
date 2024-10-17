// these are absolute imports and done with jsconfig.js file.
// simply mean absolute imports are used in next js.
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';

export const metadata : Metadata = {
  title: "Dashboard",
}

// Page.js file is used to access a route publicly. if it not persent in a route then it can not be accessed publicly, then it can be used to store some utility functions.
export default async function Page() {

  // const revenue = await fetchRevenue();
  // data fetching is the first task in server side rendering thets why the whole page is blocked to show after slow simulation.
  // if one request is slower than other then it will block the whole page in ui.
  // to solve this issue Streaming is implemented.


  // Streaming
  // Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
  // the benefit of straming is user can see or intract with the part of page when the data is loading. 
  // Why are the route are broken down into smaller chunks?
  // Chunks are rendered in parallel, reduce overall time to reflect on the ui.
  // What the need of streaming?
  // when one request is slow then other requests, it block whole page to show. (because code is run by line by line)
  // it means
  // By streaming, you can prevent slow data requests from blocking your whole page.
  // what to do when one request is slower than other?
  // if one request is done, the component that is dependent on that single request will first show in the ui.
  // How to do it?
  // by streaming mechanism.
  // How to implement straming?
  // Streaming can be implemented on component level or page level.
  // Page level: by loading.tsx, on the page level a loading skeleton is rendered untill all the requests in the page are finished.
  // component level: by suspence component. //a fallback ui is shown in the place of a component.
  // in both the cases static part is rendered and user can see or intract with the static part of the page.
  // by the straming if the complete ui is not loaded, untill then user can see and intract with the part of page.
  // Note: static part is sent from server to client first then dynamic part, thats why loading skelton are static.
  // a bug is created that loading skelton applied to all the routes under dashboard rout, because of file system.
  // this can be solved by rout groups


  // what are rout groups?
  // logical arrangement of files without affecting the url.
  // in the route groups diffrent diffrent layout, loading, error, or root layout can be created.
  // Note: route groups doesn't affect the url.

  // Route groups
  // Route groups allow you to organize files into logical groups without affecting the URL path structure.

  // How to implement suspense?
  // Two steps to implement Suspense component.
  // 1- fetching data down to the component.
  // 2- wrap the component with suspense component with providing a fallback ui for that component.
  //3- to show multiple components at a same time then wrap them in a single component and wrap theat wrapper component in to suspense.

  // const latestInvoices = await fetchLatestInvoices();
  // const cardData = await fetchCardData();
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = cardData;
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
         <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />  */}


      
        {/* this way is used when multiple component to load in at same time */}
        {/* this is called grouping the component. */}
        {/* still have doube in it, need help to clear these terms */}

        {/* Suspence: suspence is a boundary between static and dynamic component. */}

        {/* Partial Pre-rendering:
            this is the concept for data fetching mechanism.
            this is for a single route.
            streamed with suspence
            either the route is static or dynamic,
            if dynamic function is used inside the route then entire route become dynamic.
            partial pre-rendering enable both static and dynamic rendering in a single route.
            it assumes as the components that are wrapped inside the suspense component are dynamic.
            the fallback component of the suspense assumed as static.
            the static part is rendered at build time (pre-render) and the dynamic part that is wrapped inside the 
            suspense component is rendered at request.
            This process is happen for a single route.
            this is the experimental feature available in next canary version.

            for example
            a route is rendered at build time, when the user visit the static cells are served
            while asynchronous holes are created for dynamic part
            once the dyanmic part is rendered the whole are filled.
            by this way static and dynamic both part is served for a page.
            dynamic part is loaded in parrallel and take less time to load.
        */}

        {/* these two terms are same thats why confusing, but the concept is completly diffrent. */}

        {/* partial rendering: updated routes are rerendered and shared routes are preserved.
            partial rendering is the concept of the navigation
             
            use when link are hit.
            if a route is updated then it is rendered, while the shared route is preserved.
            for ex /dashboard/setting or /dashboard/analytic
            switching between both the dashboard route is preserved
            while setting or analytic route are rendered.
            this is partial rendering.
        */}
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
      </Suspense>

      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* . In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. */}
        <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart/>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}