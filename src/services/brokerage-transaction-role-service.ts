import envConfig from 'config/env';
import { list } from './client-service';

const brokerageTransactionRoleService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/brokerage_transaction_roles`,

  getTransactionRolesByName: async (search: string) => {
    const result = await list(
      `${brokerageTransactionRoleService.url}?sort[field]=date_entered&sort[direction]=asc&filter[name]=${search}`
    );
    return result;
  }
};

export default brokerageTransactionRoleService;
