import React from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastContact: string;
}

const MyCustomersPage: React.FC = () => {
  const [customers] = React.useState<Customer[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Replace with actual API call
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        // Simulated API call
        // const response = await fetchCustomersAPI();
        // setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow transition-colors text-text-base dark:text-text-dark">
      <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold">My Customers</h2>
        <button
          className="bg-primary-light dark:bg-primary-dark hover:bg-primary-600 dark:hover:bg-primary-700 px-4 py-2 rounded transition-colors"
          onClick={() => {
            /* TODO: Add new customer handler */
          }}
        >
          Add Customer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
          <thead className="bg-secondary-light dark:bg-secondary-dark">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  dark:text-text-dark uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  dark:text-text-dark uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Last Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card-light dark:bg-card-dark divide-y divide-border-light dark:divide-border-dark">
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-text-lbase/60 dark:text-text-dark/60"
                >
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-lbase dark:text-text-dark">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-lbase/70 dark:text-text-dark/70">
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-lbase/70 dark:text-text-dark/70">
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'active'
                          ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light'
                          : 'bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-lbase/70 dark:text-text-dark/70">
                    {customer.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        /* TODO: Add edit handler */
                      }}
                      className="text-primary-light hover:text-primary-600 dark:text-primary-dark dark:hover:text-primary-400 mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        /* TODO: Add delete handler */
                      }}
                      className="text-error-light hover:text-error-dark dark:text-error-dark dark:hover:text-error-light transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCustomersPage;
