import * as React from 'react'

import { cn } from '@/lib/utils'

const ProductTable = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<div className='w-full'>
		<table
			ref={ref}
			className={cn('w-full caption-bottom text-sm', className)}
			{...props}
		/>
	</div>
))
ProductTable.displayName = 'ProductTable'

const ProductTableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn('[&_tr]:border-b-0', className)} {...props} />
))
ProductTableHeader.displayName = 'ProductTableHeader'

const ProductTableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn('[&_tr:last-child]:border-0', className)}
		{...props}
	/>
))
ProductTableBody.displayName = 'ProductTableBody'

const ProductTableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			'transition-colors data-[state=selected]:bg-muted ',
			className
		)}
		{...props}
	/>
))
ProductTableRow.displayName = 'ProductTableRow'

const ProductTableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			'text-left align-middle font-normal [&:has([role=checkbox])]:pr-0',
			className
		)}
		{...props}
	/>
))
ProductTableHead.displayName = 'ProductTableHead'

const ProductTableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn('align-middle [&:has([role=checkbox])]:pr-0', className)}
		{...props}
	/>
))
ProductTableCell.displayName = 'ProductTableCell'

export {
	ProductTable,
	ProductTableHeader,
	ProductTableBody,
	ProductTableRow,
	ProductTableHead,
	ProductTableCell,
}
