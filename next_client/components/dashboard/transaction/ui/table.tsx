import React, { useState } from 'react'
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Column {
  key: string
  header: string
  sortable?: boolean
}

interface TableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (item: any) => void
  renderCell?: (item: any, key: string) => React.ReactNode
}

export function Table({ columns, data, onRowClick, renderCell }: TableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: Column) => {
    if (column.sortable) {
      if (sortColumn === column.key) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortColumn(column.key)
        setSortDirection('asc')
      }
    }
  }

  const sortedData = React.useMemo(() => {
    if (sortColumn) {
      return [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }
    return data
  }, [data, sortColumn, sortDirection])

  return (
    <div className="rounded-md border shadow-sm">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`font-semibold ${column.sortable ? 'cursor-pointer' : ''}`}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && (
                    <span className="ml-2">
                      {sortColumn === column.key ? (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-transparent" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {sortedData.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
          No Transaction
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow
          key={index}
          onClick={() => onRowClick && onRowClick(item)}
          className={`cursor-pointer transition-colors ${
            index % 2 === 0 ? 'bg-muted/50' : ''
          } hover:bg-muted`}
              >
          {columns.map((column) => (
            <TableCell key={column.key}>
              {renderCell ? renderCell(item, column.key) : item[column.key]}
            </TableCell>
          ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </ShadcnTable>
    </div>
  )
}

