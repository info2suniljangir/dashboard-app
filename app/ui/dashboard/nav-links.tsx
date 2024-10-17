"use client"
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Client side navigation: How to move around the application without making a request to server.
// in next this is happen by prefatching, link component prefetch the code and show ui instantly.
// Prefatching: prefatching mean loading the code in background, when user hit the navigation button then ui will show instantly.
// Code splitting: it means code is split into the smaller chunks that only the required part
// accessed on request,
// Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work.


// Partial rendering: Partial rendering means only the route segments that change on navigation re-render on the client, and any shared segments are preserved
// url: an specific location of the resources
//  maps URLs to the code: mean lock the code to specific url,

// What is routing
// route: what to do when url is accessed, it's an application logic. only involves the path part of the URL .
// routing is the application logic that tells what to do when url is accessed
// there is two parts of a route
// first one is path, second one is handler, that is a function. the funtion will do something when the path is accessed.
// example : app.get('/users', (req, res) => {
//   res.send('Users list');
// });

// Path is a segment of url that enable us to access specific resources on the server.

// navigation: How to move aroud the application. it's an action of going from one route to another.
// Nevigate to a route mean accessing to a diffrent route.
// example: anchor tags or link component in next js.

// Hard Navigation: full page relode.
// Soft navigation: only the rout segment that are updated rerendered. this is done by partial rendering.
// Note: a url is not a route


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {

  const pathname = usePathname();
  // eg: pathname =  "/dashboard/customers"
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            // creating active link
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
