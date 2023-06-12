import { ObjectType } from 'types';
import { OpportunityEntity } from './opportunity-entity';
import { OpportunityListItem } from './opportunity-list-item';

export interface OpportunityListResponseType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: OpportunityListItem[];
    meta: {
      total: number;
    };
  };
  errorMessage: any;
}

export interface OpportunityByIdResponseType {
  isSuccess: boolean;
  isError: boolean;
  data: OpportunityEntity | ObjectType;
  errorMessage: any;
}
