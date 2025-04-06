"use client";

import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }) {
    function generatePagination(currentPage, totalPages) {
        // Se total de páginas for menor ou igual a 7, exiba todas as páginas sem reticências.
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Se a página atual for menor ou igual a 3,
        // exiba as primeiras 3 páginas, reticências e as últimas 2 páginas.
        if (currentPage <= 3) {
            return [1, 2, 3, '...', totalPages - 1, totalPages];
        }

        // Se a página atual estiver entre as últimas 3 páginas,
        // exiba as 2 primeiras páginas, reticências e as últimas 3 páginas.
        if (currentPage >= totalPages - 2) {
            return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
        }

        // Se a página atual estiver no meio, exiba a primeira página,
        // reticências, a página atual e suas vizinhas, outra reticência e a última página.
        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
        ];
    }
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const createPageURL = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
    const allPages = generatePagination(currentPage, totalPages);

    return (
        <>
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex gap-2">
                    {allPages.map((page, index) => {
                        let position = undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
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
}) {
    const className = clsx(
      "py-2 px-4 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] flex items-center justify-center",
      {
        "bg-amarelo text-white border-0": isActive,
      }
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}) {
    const className = clsx(
        "py-2 px-4 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] flex items-center justify-center",
        {
            "pointer-events-none text-gray-300": isDisabled,
            "hover:bg-azul-mortinho": !isDisabled,
            "mr-2 md:mr-4": direction === "left",
            "ml-2 md:ml-4": direction === "right",
        }
    );

    const icon =
        direction === "left" ? (
            <Image alt="" src={"/icons/caret-left.svg"} width={10} height={10} />
        ) : (
            <Image alt="" src={"/icons/caret-left.svg"} width={10} height={10} className="rotate-180" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}
