import { ObjectType } from 'types';

const customerReservationStatus: ObjectType = {
  new: 'New',
  pending: 'Pending',
  failed: 'Failed',
  complete: 'Complete',
  release_pending: 'Release Pending',
  released: 'Released',
  errors_returned: 'Errors Returned',
  property_fields_missing: 'Property Fields Missing',
  errors_returned_already_submitted: 'Entera ID Already Reserved Response',
  errors_returned_zip_code_not_valid: 'Zip Code Not Valid Response',
  errors_returned_reserved_by_another_party:
    'Reserved by Another Party Response',
  'Attempt Not Made - Customer Unsupported':
    'Attempt Not Made - Customer Unsupported'
};

export default customerReservationStatus;
