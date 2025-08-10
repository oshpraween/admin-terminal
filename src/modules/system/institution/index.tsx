import React from 'react';
import PermissionGuard from 'src/guards/permission-guard';
import { CUSTOMERS } from 'src/constants/permissions.constants';

interface CustomerDetailsProp {
  title?: string;
}

const CustomerDetailsPage: React.FC<CustomerDetailsProp> = (props) => {
  const { title = 'Customer Details' } = props;
  return (
    <PermissionGuard requiredPermission={CUSTOMERS} isPermissionExists={false}>
      <div className="text-text-base dark:text-text-dark w-full h-full p-4 bg-background-light dark:bg-background-dark  transition-colors rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium ">Customer Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark transition-colors"
            placeholder="Enter text here"
          />
        </div>
      </div>
    </PermissionGuard>
  );
};

export default CustomerDetailsPage;
