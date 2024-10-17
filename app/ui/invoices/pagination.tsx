'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
//code like you have infinite time.

// Note: in this project i am learning the fundamentals of nextjs not tailwind, that's why I don't want to create pagination component.
// Second thing it takes lot of time, and the output is not efficient.
// There I learnt that in the programming go with the logic instead of emotion.

              // Programming, I am not afraid of you. I am going to chop you down and finish forever.
              // Nothing to be feared in coding, it just teach you how to broken down the problem in to smaller steps. 
              // and further broke down them in to micro steps. But it goanna take a lot of time.
              // I am still not satisfied because I didn't do it at myself.
              // But the fear is still not destroyed, because it take lot of time and hard work, that is not efficient.
              // Start fast to become efficient.
export default function Pagination({ totalPages }: { totalPages: number }) {
  // never fetch data in to the client component.

  // The pagination component
  // The two parts of this component to be understood.
  // first one is logic
  // scond one is visual state.
  // exploring the logic with steps.
  // exploring the visual state with numbers.
  // combine them.

  //Nothing is complex if broken down into smaller steps. these steps are developed by visualization of what need to be done.
  // this is way to simplify the things or problems. 
  // Step 1: Show the numbers in the ui logically.
  // Step 2: enable navigation for all of them.
  // Step 3: Show the active state, 
  // Step 4: If the state is active, or page is ... then disable navigation for them.
  // Step 5: if the page is first or last then disable arrows according to it., if the page is single then this will automatically cover.

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Step 1: generate a squence of numbers, for diffrent cases.
  // there are four conditions to generate a sequence of numbers.
  // if the totalPages are smaller than or equal to 7 then return a series of numbers.
  // if the currentPage is less than or equal to 3 then return [1,2,3,...,7,8]
  // if the currentPage is greater than allPages-2 means among the last three pages [1,2,...,7,8,9]
  // if the currentPage in between 4 to allPages-3 then show [1,..., currentPage-1, currentPage, currentPage+1, ..., totalPages]
  const allPages = generatePagination(currentPage, totalPages);  


  // creating the page url is most important part, it's something that nextjs want to teach me.
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }
  return (
    <>

      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {/* Step 2: get the numbers in the ui. */}
          {allPages.map((page, index) => {


            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                // this href is created for all the elements of the array. and it's for routing of page numbers.
                href={createPageURL(page)}
                // this is the page number
                page={page}
                // the position given for visual states.
                position={position}
                // Step 4: once the page is navigated then show active state.
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  // sub step of 5: show the ui for active or not active state.
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  // Step 5: if the page is active or ... then disable navigation for them.
  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    // Step 3: Navigate to a page by clicking, 
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
