
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: TablePaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#1E1E1E] border-t border-[#525252]">
      <div className="flex items-center gap-2 text-sm text-[#AAAAAA]">
        <span>Itens por página:</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
        >
          <SelectTrigger className="w-16 h-8 bg-[#0D0D0D] border-[#333] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] border-[#333]">
            <SelectItem value="10" className="text-white hover:bg-[#333]">10</SelectItem>
            <SelectItem value="25" className="text-white hover:bg-[#333]">25</SelectItem>
            <SelectItem value="50" className="text-white hover:bg-[#333]">50</SelectItem>
            <SelectItem value="100" className="text-white hover:bg-[#333]">100</SelectItem>
          </SelectContent>
        </Select>
        <span>
          Mostrando {startItem} a {endItem} de {totalItems} canais
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={`h-8 w-8 p-0 ${
                  currentPage === pageNum
                    ? "bg-[#FF0000] text-white"
                    : "border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 border-[#525252] bg-[#0D0D0D] text-[#AAAAAA] hover:text-white hover:bg-[#333]"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
