/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /** The `Decimal` scalar type represents a python Decimal. */
  Decimal: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export enum ApiDetailsFormatLoc {
  /** Header */
  Header = 'HEADER',
  /** Param */
  Param = 'PARAM'
}

export type ApiParameterInputType = {
  default: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  download_api_options_same?: InputMaybe<Scalars['Boolean']>;
  download_options?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  format?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key: Scalars['String'];
  options?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type?: InputMaybe<ParameterTypes>;
};

export enum ApiParameterType {
  /** Download */
  Download = 'DOWNLOAD',
  /** Exposed */
  Exposed = 'EXPOSED',
  /** Pagination */
  Pagination = 'PAGINATION',
  /** Preview */
  Preview = 'PREVIEW'
}

export type ApiParametersType = {
  __typename?: 'APIParametersType';
  api_details: ApiDetailsType;
  default: Scalars['String'];
  description: Scalars['String'];
  download_api_options_same: Scalars['Boolean'];
  download_options?: Maybe<Array<Scalars['String']>>;
  format: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  options?: Maybe<Array<Scalars['String']>>;
  type: ApiParameterType;
};

export type ApiSourceInput = {
  api_version?: InputMaybe<Scalars['String']>;
  auth_credentials?: InputMaybe<Array<InputMaybe<KeyValueType>>>;
  auth_loc?: InputMaybe<AuthLocation>;
  auth_token?: InputMaybe<Scalars['String']>;
  auth_token_key?: InputMaybe<Scalars['String']>;
  auth_type: AuthType;
  base_url: Scalars['String'];
  description: Scalars['String'];
  headers?: InputMaybe<Array<InputMaybe<KeyValueType>>>;
  id?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type ApiSourceType = {
  __typename?: 'APISourceType';
  all_dataset_count?: Maybe<Scalars['Int']>;
  api_version?: Maybe<Scalars['String']>;
  apidetails_set: Array<ApiDetailsType>;
  auth_credentials?: Maybe<Scalars['JSONString']>;
  auth_loc?: Maybe<Scalars['String']>;
  auth_token?: Maybe<Scalars['String']>;
  auth_token_key?: Maybe<Scalars['String']>;
  auth_type: Scalars['String'];
  base_url: Scalars['String'];
  description: Scalars['String'];
  headers?: Maybe<Array<Maybe<Scalars['JSONString']>>>;
  id: Scalars['ID'];
  organization: OrganizationType;
  published_dataset_count?: Maybe<Scalars['Int']>;
  published_datasets?: Maybe<Array<Maybe<DatasetType>>>;
  title: Scalars['String'];
};

export type AccessModelResourceInput = {
  access_model_id: Scalars['ID'];
  dataset_id: Scalars['ID'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  payment?: InputMaybe<Scalars['Int']>;
  payment_type: Paymenttypes;
  policy_id?: InputMaybe<Scalars['ID']>;
  resource_map: Array<InputMaybe<ResourceFieldInput>>;
  title: Scalars['String'];
};

export type AccessModelResourceType = {
  __typename?: 'AccessModelResourceType';
  dataset_access_model: DatasetAccessModelType;
  fields: Array<ResourceSchemaType>;
  id: Scalars['ID'];
  parameters?: Maybe<Array<Maybe<Scalars['JSONString']>>>;
  resource: ResourceType;
  sample_enabled: Scalars['Boolean'];
  sample_rows: Scalars['Int'];
  supported_formats?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum AccessTypes {
  Open = 'OPEN',
  Registered = 'REGISTERED',
  Restricted = 'RESTRICTED'
}

export type ActivityFilter = {
  type?: InputMaybe<FieldTypes>;
  value?: InputMaybe<Scalars['String']>;
};

export type ActivityType = {
  __typename?: 'ActivityType';
  action_object_object_id?: Maybe<Scalars['String']>;
  actor: Scalars['String'];
  browser?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dtf_passed_time?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ip?: Maybe<Scalars['String']>;
  issued: Scalars['DateTime'];
  passed_time?: Maybe<Scalars['String']>;
  public: Scalars['Boolean'];
  slug?: Maybe<Scalars['String']>;
  target_group_object_id?: Maybe<Scalars['String']>;
  target_object_id?: Maybe<Scalars['String']>;
  target_title?: Maybe<Scalars['String']>;
  target_type?: Maybe<Scalars['String']>;
  verb: Scalars['String'];
};

export type AdditionalInfoInput = {
  dataset: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['Upload']>;
  format?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  license_title?: InputMaybe<Scalars['String']>;
  license_url?: InputMaybe<Scalars['String']>;
  policy_title?: InputMaybe<Scalars['String']>;
  policy_url?: InputMaybe<Scalars['String']>;
  remote_url?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<InfoType>;
};

export type AdditionalInfoType = {
  __typename?: 'AdditionalInfoType';
  dataset: DatasetType;
  description: Scalars['String'];
  file: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  /** For EXTERNAL datasets */
  license_title?: Maybe<Scalars['String']>;
  /** For EXTERNAL datasets */
  license_url?: Maybe<Scalars['String']>;
  modified: Scalars['DateTime'];
  /** For EXTERNAL datasets */
  policy_title?: Maybe<Scalars['String']>;
  /** For EXTERNAL datasets */
  policy_url?: Maybe<Scalars['String']>;
  remote_url: Scalars['String'];
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type AddressModerationRequests = {
  __typename?: 'AddressModerationRequests';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  moderation_request?: Maybe<ModerationRequestType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AgreementInput = {
  dataset_access_model: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  purpose?: InputMaybe<PurposeType>;
  user_email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AgreementMutation = {
  __typename?: 'AgreementMutation';
  agreement?: Maybe<AgreementType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum AgreementStatus {
  /** Accepted */
  Accepted = 'ACCEPTED',
  /** Rejected */
  Rejected = 'REJECTED'
}

export type AgreementType = {
  __typename?: 'AgreementType';
  accepted_agreement?: Maybe<Scalars['String']>;
  dataset_access_model: DatasetAccessModelType;
  dataset_access_model_request: DataAccessModelRequestType;
  id: Scalars['ID'];
  status: AgreementStatus;
  user_email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type ApiDetailsType = {
  __typename?: 'ApiDetailsType';
  api_source: ApiSourceType;
  apiparameter_set: Array<ApiParametersType>;
  auth_required: Scalars['Boolean'];
  default_format?: Maybe<Scalars['String']>;
  download_formats?: Maybe<Array<Scalars['String']>>;
  download_same_as_api: Scalars['Boolean'];
  format_key?: Maybe<Scalars['String']>;
  format_loc?: Maybe<ApiDetailsFormatLoc>;
  is_large_dataset: Scalars['Boolean'];
  parameters?: Maybe<Array<Maybe<ApiParametersType>>>;
  request_type: Scalars['String'];
  resource: ResourceType;
  response_type?: Maybe<Scalars['String']>;
  supported_formats?: Maybe<Array<Scalars['String']>>;
  url_path: Scalars['String'];
};

export type ApiInputType = {
  api_source: Scalars['ID'];
  auth_required: Scalars['Boolean'];
  default_format?: InputMaybe<Scalars['String']>;
  download_formats?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  download_same_as_api?: InputMaybe<Scalars['Boolean']>;
  format_key?: InputMaybe<Scalars['String']>;
  format_loc?: InputMaybe<FormatLocation>;
  is_large_dataset?: InputMaybe<Scalars['Boolean']>;
  parameters?: InputMaybe<Array<InputMaybe<ApiParameterInputType>>>;
  request_type?: InputMaybe<RequestType>;
  response_type?: InputMaybe<ResponseType>;
  supported_formats?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_path: Scalars['String'];
};

export type ApproveRejectDataAccessModelRequest = {
  __typename?: 'ApproveRejectDataAccessModelRequest';
  data_access_model_request?: Maybe<DataAccessModelRequestType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectLicense = {
  __typename?: 'ApproveRejectLicense';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  license_requests?: Maybe<Array<Maybe<LicenseType>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectLicenseAddition = {
  __typename?: 'ApproveRejectLicenseAddition';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  license_requests?: Maybe<Array<Maybe<LicenseAdditionType>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectModerationRequests = {
  __typename?: 'ApproveRejectModerationRequests';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  moderation_requests?: Maybe<Array<Maybe<ModerationRequestType>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectOrganizationApproval = {
  __typename?: 'ApproveRejectOrganizationApproval';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  organization?: Maybe<CreateOrganizationType>;
  rejected?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectOrganizationApprovalInput = {
  id: Scalars['ID'];
  remark?: InputMaybe<Scalars['String']>;
  status: OrganizationCreationStatusType;
};

export type ApproveRejectOrganizationRequest = {
  __typename?: 'ApproveRejectOrganizationRequest';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  organization_request?: Maybe<OrganizationRequestType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectPolicy = {
  __typename?: 'ApproveRejectPolicy';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  policy?: Maybe<PolicyType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectRating = {
  __typename?: 'ApproveRejectRating';
  dataset_rating?: Maybe<DatasetRatingType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ApproveRejectReviewRequests = {
  __typename?: 'ApproveRejectReviewRequests';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  review_requests?: Maybe<Array<Maybe<ReviewRequestType>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum AuthLocation {
  Header = 'HEADER',
  Param = 'PARAM'
}

export enum AuthType {
  Credentials = 'CREDENTIALS',
  NoAuth = 'NO_AUTH',
  Token = 'TOKEN'
}

export type CatalogInput = {
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CatalogType = {
  __typename?: 'CatalogType';
  dataset_set: Array<DatasetType>;
  description: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  organization: OrganizationType;
  title: Scalars['String'];
};

export type CreateApiSource = {
  __typename?: 'CreateAPISource';
  API_source?: Maybe<ApiSourceType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateAccessModelResource = {
  __typename?: 'CreateAccessModelResource';
  access_model_resource?: Maybe<DatasetAccessModelType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateAdditionInfo = {
  __typename?: 'CreateAdditionInfo';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  resource?: Maybe<AdditionalInfoType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateCatalog = {
  __typename?: 'CreateCatalog';
  catalog?: Maybe<CatalogType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateDataAccessModel = {
  __typename?: 'CreateDataAccessModel';
  data_access_model?: Maybe<DataAccessModelType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateDataset = {
  __typename?: 'CreateDataset';
  dataset?: Maybe<DatasetType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateDatasetInput = {
  dataset_type: DataType;
  description: Scalars['String'];
  funnel?: Scalars['String'];
  title: Scalars['String'];
};

export type CreateDatasetRating = {
  __typename?: 'CreateDatasetRating';
  dataset_rating?: Maybe<DatasetRatingType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateExternalAccessModel = {
  __typename?: 'CreateExternalAccessModel';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  external_access_model?: Maybe<ExternalAccessModelType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateGeography = {
  __typename?: 'CreateGeography';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  geography?: Maybe<GeographyType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateLicense = {
  __typename?: 'CreateLicense';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  license?: Maybe<LicenseType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateLicenseAddition = {
  __typename?: 'CreateLicenseAddition';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  license?: Maybe<LicenseAdditionType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateOrganization = {
  __typename?: 'CreateOrganization';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  organization?: Maybe<CreateOrganizationType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateOrganizationType = {
  __typename?: 'CreateOrganizationType';
  address?: Maybe<Scalars['String']>;
  cdo_notification: Scalars['String'];
  contact_email?: Maybe<Scalars['String']>;
  data_description?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  dpa_designation?: Maybe<Scalars['String']>;
  dpa_email?: Maybe<Scalars['String']>;
  dpa_name?: Maybe<Scalars['String']>;
  dpa_phone?: Maybe<Scalars['String']>;
  homepage: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  logo?: Maybe<Scalars['String']>;
  modified: Scalars['DateTime'];
  ogd_tid?: Maybe<Scalars['Int']>;
  organization_ptr: OrganizationType;
  organization_subtypes?: Maybe<OrganizationCreateRequestOrganizationSubtypes>;
  organization_types: OrganizationOrganizationTypes;
  orgdpahistory?: Maybe<OrgDpaType>;
  parent?: Maybe<OrganizationType>;
  remark?: Maybe<Scalars['String']>;
  sample_data_url: Scalars['String'];
  state?: Maybe<GeographyType>;
  status: OrganizationCreateRequestStatus;
  title: Scalars['String'];
  upload_sample_data_file: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePolicy = {
  __typename?: 'CreatePolicy';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  policy?: Maybe<PolicyType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateResource = {
  __typename?: 'CreateResource';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  resource?: Maybe<ResourceType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateSector = {
  __typename?: 'CreateSector';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  sector?: Maybe<SectorType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateTag = {
  __typename?: 'CreateTag';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
  tag?: Maybe<TagType>;
};

export type DataAccessModelInput = {
  additions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contract?: InputMaybe<Scalars['Upload']>;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  is_global?: InputMaybe<Scalars['Boolean']>;
  license: Scalars['ID'];
  rate_limit: Scalars['Int'];
  rate_limit_unit: RateLimitUnits;
  subscription_quota?: InputMaybe<Scalars['Int']>;
  subscription_quota_unit?: InputMaybe<SubscriptionUnits>;
  title: Scalars['String'];
  type: AccessTypes;
  validation?: InputMaybe<Scalars['Int']>;
  validation_unit?: InputMaybe<ValidationUnits>;
};

export type DataAccessModelRequestInput = {
  access_model: Scalars['ID'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  purpose: PurposeType;
  user_email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type DataAccessModelRequestMutation = {
  __typename?: 'DataAccessModelRequestMutation';
  data_access_model_request?: Maybe<DataAccessModelRequestType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum DataAccessModelRequestStatusType {
  Approved = 'APPROVED',
  Paymentpending = 'PAYMENTPENDING',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type DataAccessModelRequestType = {
  __typename?: 'DataAccessModelRequestType';
  access_model: DatasetAccessModelType;
  agreement_set: Array<AgreementType>;
  datarequest_set: Array<DataRequestType>;
  description: Scalars['String'];
  id: Scalars['ID'];
  is_valid?: Maybe<Scalars['Boolean']>;
  issued: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  purpose: Scalars['String'];
  remaining_quota?: Maybe<Scalars['Int']>;
  remark?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  token_time: Scalars['DateTime'];
  user?: Maybe<Scalars['String']>;
  user_email?: Maybe<Scalars['String']>;
  validity?: Maybe<Scalars['String']>;
};

export type DataAccessModelRequestUpdateInput = {
  id: Scalars['ID'];
  remark?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<DataAccessModelRequestStatusType>;
};

export enum DataAccessModelStatus {
  /** Active */
  Active = 'ACTIVE',
  /** Disabled */
  Disabled = 'DISABLED'
}

export enum DataAccessModelSubscriptionQuotaUnit {
  /** Daily */
  Daily = 'DAILY',
  /** Limiteddownload */
  Limiteddownload = 'LIMITEDDOWNLOAD',
  /** Monthly */
  Monthly = 'MONTHLY',
  /** Quarterly */
  Quarterly = 'QUARTERLY',
  /** Weekly */
  Weekly = 'WEEKLY',
  /** Yearly */
  Yearly = 'YEARLY'
}

export type DataAccessModelType = {
  __typename?: 'DataAccessModelType';
  active_users?: Maybe<Scalars['Int']>;
  contract: Scalars['String'];
  dataset_count?: Maybe<Scalars['Int']>;
  datasetaccessmodel_set: Array<DatasetAccessModelType>;
  description: Scalars['String'];
  id: Scalars['ID'];
  is_global: Scalars['Boolean'];
  issued: Scalars['DateTime'];
  license: LicenseType;
  license_additions: Array<LicenseAdditionType>;
  modified: Scalars['DateTime'];
  organization?: Maybe<OrganizationType>;
  rate_limit: Scalars['Int'];
  rate_limit_unit: Scalars['String'];
  status: DataAccessModelStatus;
  subscription_quota?: Maybe<Scalars['Int']>;
  subscription_quota_unit?: Maybe<DataAccessModelSubscriptionQuotaUnit>;
  title: Scalars['String'];
  type: Scalars['String'];
  validation?: Maybe<Scalars['Int']>;
  validation_unit?: Maybe<DataAccessModelValidationUnit>;
};

export enum DataAccessModelValidationUnit {
  /** Day */
  Day = 'DAY',
  /** Lifetime */
  Lifetime = 'LIFETIME',
  /** Month */
  Month = 'MONTH',
  /** Week */
  Week = 'WEEK',
  /** Year */
  Year = 'YEAR'
}

export type DataRequestInput = {
  dataset_access_model_request: Scalars['ID'];
  parameters?: InputMaybe<Array<InputMaybe<DataRequestParameterInput>>>;
  resource: Scalars['ID'];
};

export type DataRequestMutation = {
  __typename?: 'DataRequestMutation';
  data_request?: Maybe<DataRequestType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DataRequestParameterInput = {
  key: Scalars['ID'];
  value: Scalars['String'];
};

export type DataRequestType = {
  __typename?: 'DataRequestType';
  access_token?: Maybe<Scalars['String']>;
  creation_date?: Maybe<Scalars['DateTime']>;
  data_refresh_token?: Maybe<Scalars['String']>;
  data_token?: Maybe<Scalars['String']>;
  dataset_access_model_request: DataAccessModelRequestType;
  default: Scalars['Boolean'];
  file?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  parameters?: Maybe<Scalars['JSONString']>;
  refresh_token?: Maybe<Scalars['String']>;
  reject_reason: Scalars['String'];
  remaining_quota?: Maybe<Scalars['Int']>;
  resource: ResourceType;
  status: Scalars['String'];
  user?: Maybe<Scalars['String']>;
};

export type DataRequestUpdateInput = {
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['UUID'];
  status?: InputMaybe<DatasetRequestStatusType>;
};

export type DataRequestUpdateMutation = {
  __typename?: 'DataRequestUpdateMutation';
  data_request?: Maybe<DataRequestType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum DataType {
  Api = 'API',
  External = 'EXTERNAL',
  File = 'FILE'
}

export enum DatasetAccessModelPaymentType {
  /** Free */
  Free = 'FREE',
  /** Paid */
  Paid = 'PAID'
}

export type DatasetAccessModelRequestUserMigration = {
  __typename?: 'DatasetAccessModelRequestUserMigration';
  data_access_model_request?: Maybe<DataAccessModelRequestType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DatasetAccessModelType = {
  __typename?: 'DatasetAccessModelType';
  agreements: Array<AgreementType>;
  data_access_model: DataAccessModelType;
  dataset: DatasetType;
  datasetaccessmodelrequest_set: Array<DataAccessModelRequestType>;
  datasetaccessmodelresource_set: Array<AccessModelResourceType>;
  description: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  payment?: Maybe<Scalars['Float']>;
  payment_type: DatasetAccessModelPaymentType;
  policy?: Maybe<PolicyType>;
  resource_formats?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  usage?: Maybe<Scalars['Int']>;
};

export type DatasetCount = {
  __typename?: 'DatasetCount';
  dataset_count?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export enum DatasetDatasetType {
  /** Api */
  Api = 'API',
  /** External */
  External = 'EXTERNAL',
  /** File */
  File = 'FILE'
}

export type DatasetRatingApproveRejectInput = {
  id: Scalars['ID'];
  status: RatingStatus;
};

export type DatasetRatingInput = {
  data_quality: Scalars['Float'];
  dataset: Scalars['ID'];
  id?: InputMaybe<Scalars['ID']>;
  review: Scalars['String'];
};

export type DatasetRatingType = {
  __typename?: 'DatasetRatingType';
  data_quality: Scalars['Float'];
  dataset: DatasetType;
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  review: Scalars['String'];
  status: DatasetRatingsStatus;
  user: Scalars['String'];
};

export enum DatasetRatingsStatus {
  /** Created */
  Created = 'CREATED',
  /** Published */
  Published = 'PUBLISHED',
  /** Rejected */
  Rejected = 'REJECTED'
}

export enum DatasetRequestStatusType {
  Fetched = 'FETCHED',
  Fulfilled = 'FULFILLED',
  Requested = 'REQUESTED'
}

export enum DatasetReviewRequestRequestType {
  /** Moderation */
  Moderation = 'MODERATION',
  /** Review */
  Review = 'REVIEW'
}

export enum DatasetStatus {
  Disabled = 'DISABLED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Readytopublish = 'READYTOPUBLISH',
  Reviewed = 'REVIEWED',
  Transformationinprogress = 'TRANSFORMATIONINPROGRESS',
  Undermoderation = 'UNDERMODERATION',
  Underreview = 'UNDERREVIEW'
}

export type DatasetType = {
  __typename?: 'DatasetType';
  accepted_agreement?: Maybe<Scalars['String']>;
  action: Scalars['String'];
  additionalinfo_set: Array<AdditionalInfoType>;
  average_rating?: Maybe<Scalars['Float']>;
  catalog: CatalogType;
  confirms_to?: Maybe<Scalars['String']>;
  contact_point?: Maybe<Scalars['String']>;
  dataset_type: DatasetDatasetType;
  datasetaccessmodel_set: Array<DatasetAccessModelType>;
  datasetratings_set: Array<DatasetRatingType>;
  datasetreviewrequest_set: Array<ReviewRequestType>;
  description: Scalars['String'];
  download_count: Scalars['Int'];
  externalaccessmodel_set: Array<ExternalAccessModelType>;
  funnel: Scalars['String'];
  geography: Array<GeographyType>;
  highlights?: Maybe<Array<Maybe<Scalars['String']>>>;
  hvd_rating: Scalars['Decimal'];
  id: Scalars['ID'];
  in_series?: Maybe<Scalars['String']>;
  is_datedynamic: Scalars['Boolean'];
  issued: Scalars['DateTime'];
  language?: Maybe<Scalars['String']>;
  last_updated?: Maybe<Scalars['DateTime']>;
  modified: Scalars['DateTime'];
  parent?: Maybe<DatasetType>;
  parent_field: Array<DatasetType>;
  period_from?: Maybe<Scalars['Date']>;
  period_to?: Maybe<Scalars['Date']>;
  published_date?: Maybe<Scalars['DateTime']>;
  qualified_attribution?: Maybe<Scalars['String']>;
  remote_issued?: Maybe<Scalars['Date']>;
  remote_modified?: Maybe<Scalars['Date']>;
  resource_set: Array<ResourceType>;
  sector: Array<SectorType>;
  slug?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  spatial_coverage?: Maybe<Scalars['String']>;
  spatial_resolution?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  subscribe_set: Array<SubscribeType>;
  tags: Array<TagType>;
  temporal_coverage?: Maybe<Scalars['String']>;
  temporal_resolution?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  update_frequency?: Maybe<Scalars['String']>;
  version_name?: Maybe<Scalars['String']>;
};

export type DeleteApiSource = {
  __typename?: 'DeleteAPISource';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeleteAccessModelResource = {
  __typename?: 'DeleteAccessModelResource';
  access_model_resource?: Maybe<DatasetAccessModelType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteAccessModelResourceInput = {
  dam_id: Scalars['ID'];
  dataset_id: Scalars['ID'];
};

export type DeleteAdditionalInfo = {
  __typename?: 'DeleteAdditionalInfo';
  additional_info?: Maybe<AdditionalInfoType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteDataAccessModel = {
  __typename?: 'DeleteDataAccessModel';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeleteDataAccessModelInput = {
  id: Scalars['ID'];
};

export type DeleteExternalAccessModel = {
  __typename?: 'DeleteExternalAccessModel';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeleteExternalAccessModelInput = {
  id: Scalars['ID'];
};

export type DeleteLicense = {
  __typename?: 'DeleteLicense';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeleteOrganizationRequestMutation = {
  __typename?: 'DeleteOrganizationRequestMutation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeletePolicy = {
  __typename?: 'DeletePolicy';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeleteResource = {
  __typename?: 'DeleteResource';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DeleteResourceInput = {
  id: Scalars['ID'];
};

export type DisableDataAccessModel = {
  __typename?: 'DisableDataAccessModel';
  data_access_model?: Maybe<DataAccessModelType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['String']>;
};

export type DisableDataAccessModelInput = {
  id: Scalars['ID'];
};

export type EditDataset = {
  __typename?: 'EditDataset';
  dataset_id?: Maybe<Scalars['ID']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type EditDatasetInput = {
  id: Scalars['ID'];
  new_version_name: Scalars['String'];
};

export type ExternalAccessModelInput = {
  dataset: Scalars['ID'];
  id?: InputMaybe<Scalars['ID']>;
  license: Scalars['ID'];
  policy?: InputMaybe<Scalars['ID']>;
};

export type ExternalAccessModelType = {
  __typename?: 'ExternalAccessModelType';
  dataset: DatasetType;
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  license: LicenseType;
  modified: Scalars['DateTime'];
  policy?: Maybe<PolicyType>;
};

export enum FieldTypes {
  Actor = 'actor',
  Browser = 'browser',
  Ip = 'ip',
  Verb = 'verb'
}

export type FileDetailsType = {
  __typename?: 'FileDetailsType';
  file: Scalars['String'];
  format: Scalars['String'];
  remote_url: Scalars['String'];
  resource: ResourceType;
  source_file_name: Scalars['String'];
  supported_formats?: Maybe<Array<Scalars['String']>>;
};

export type FileInputType = {
  file?: InputMaybe<Scalars['Upload']>;
  format?: InputMaybe<Scalars['String']>;
  remote_url?: InputMaybe<Scalars['String']>;
};

export type Filters = {
  __typename?: 'Filters';
  geographies?: Maybe<Array<Maybe<GeographyItem>>>;
  providers?: Maybe<Array<Maybe<OrgsItem>>>;
  sectors?: Maybe<Array<Maybe<SectorItem>>>;
};

export enum FormatLocation {
  Header = 'HEADER',
  Param = 'PARAM'
}

export enum GeoTypes {
  Country = 'COUNTRY',
  District = 'DISTRICT',
  State = 'STATE',
  Ut = 'UT'
}

export enum GeographyGeoType {
  /** Country */
  Country = 'COUNTRY',
  /** District */
  District = 'DISTRICT',
  /** State */
  State = 'STATE',
  /** Ut */
  Ut = 'UT'
}

export type GeographyInput = {
  geo_type: GeoTypes;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  official_id?: InputMaybe<Scalars['String']>;
  parent_id?: InputMaybe<Scalars['String']>;
};

export type GeographyItem = {
  __typename?: 'GeographyItem';
  geograph_name?: Maybe<Scalars['String']>;
  geography_id?: Maybe<Scalars['String']>;
};

export type GeographyType = {
  __typename?: 'GeographyType';
  dataset_set: Array<DatasetType>;
  geo_type?: Maybe<GeographyGeoType>;
  geography_set: Array<GeographyType>;
  id: Scalars['ID'];
  name: Scalars['String'];
  official_id?: Maybe<Scalars['String']>;
  organizationcreaterequest_set: Array<CreateOrganizationType>;
  parent_id?: Maybe<GeographyType>;
};

export enum InfoType {
  Blog = 'BLOG',
  Datastory = 'DATASTORY',
  Other = 'OTHER',
  Report = 'REPORT',
  Usecase = 'USECASE'
}

export type KeyValueType = {
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export enum Licenseadditionstate {
  Created = 'CREATED',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED'
}

export type LicenceAdditionInputType = {
  description: Scalars['String'];
  generic_item?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type LicenseAdditionApproveRejectInput = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  reject_reason?: InputMaybe<Scalars['String']>;
  status: Licenseadditionstate;
};

export enum LicenseAdditionStatus {
  /** Created */
  Created = 'CREATED',
  /** Published */
  Published = 'PUBLISHED',
  /** Rejected */
  Rejected = 'REJECTED'
}

export type LicenseAdditionType = {
  __typename?: 'LicenseAdditionType';
  dataaccessmodel_set: Array<DataAccessModelType>;
  description: Scalars['String'];
  generic_item: Scalars['Boolean'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  license: LicenseType;
  modified: Scalars['DateTime'];
  reject_reason?: Maybe<Scalars['String']>;
  status: LicenseAdditionStatus;
  title: Scalars['String'];
};

export type LicenseAdditionsCreateInput = {
  description: Scalars['String'];
  generic_item?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  license: Scalars['ID'];
  title: Scalars['String'];
};

export type LicenseApproveRejectInput = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  reject_reason?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
};

export type LicenseInput = {
  description: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  id?: InputMaybe<Scalars['ID']>;
  license_additions?: InputMaybe<Array<InputMaybe<LicenceAdditionInputType>>>;
  remote_url?: InputMaybe<Scalars['String']>;
  short_name?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};

export enum LicenseStatus {
  /** Created */
  Created = 'CREATED',
  /** Published */
  Published = 'PUBLISHED',
  /** Rejected */
  Rejected = 'REJECTED'
}

export type LicenseType = {
  __typename?: 'LicenseType';
  additions?: Maybe<Array<Maybe<LicenseAdditionType>>>;
  created_organization?: Maybe<OrganizationType>;
  dataaccessmodel_set: Array<DataAccessModelType>;
  description: Scalars['String'];
  externalaccessmodel_set: Array<ExternalAccessModelType>;
  file: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  licenseaddition_set: Array<LicenseAdditionType>;
  modified: Scalars['DateTime'];
  reject_reason: Scalars['String'];
  remote_url: Scalars['String'];
  short_name?: Maybe<Scalars['String']>;
  status: LicenseStatus;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type ModerationRequestInput = {
  dataset: Scalars['ID'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  reject_reason?: InputMaybe<Scalars['String']>;
  remark?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusType>;
};

export type ModerationRequestMutation = {
  __typename?: 'ModerationRequestMutation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  moderation_request?: Maybe<ModerationRequestType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ModerationRequestType = {
  __typename?: 'ModerationRequestType';
  creation_date: Scalars['DateTime'];
  dataset: DatasetType;
  description: Scalars['String'];
  id: Scalars['ID'];
  modified_date: Scalars['DateTime'];
  parent?: Maybe<ReviewRequestType>;
  parent_field: Array<ReviewRequestType>;
  reject_reason: Scalars['String'];
  remark: Scalars['String'];
  request_type: DatasetReviewRequestRequestType;
  status: Scalars['String'];
  user: Scalars['String'];
};

export type ModerationRequestsApproveRejectInput = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  remark?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  access_model_resource?: Maybe<CreateAccessModelResource>;
  address_moderation_requests?: Maybe<AddressModerationRequests>;
  agreement_request?: Maybe<AgreementMutation>;
  approve_reject_data_access_model_request?: Maybe<ApproveRejectDataAccessModelRequest>;
  approve_reject_dataset_rating?: Maybe<ApproveRejectRating>;
  approve_reject_license?: Maybe<ApproveRejectLicense>;
  approve_reject_license_addition?: Maybe<ApproveRejectLicenseAddition>;
  approve_reject_moderation_requests?: Maybe<ApproveRejectModerationRequests>;
  approve_reject_organization_approval?: Maybe<ApproveRejectOrganizationApproval>;
  approve_reject_organization_request?: Maybe<ApproveRejectOrganizationRequest>;
  approve_reject_policy?: Maybe<ApproveRejectPolicy>;
  approve_reject_review_request?: Maybe<ApproveRejectReviewRequests>;
  create_additional_info?: Maybe<CreateAdditionInfo>;
  create_api_source?: Maybe<CreateApiSource>;
  create_catalog?: Maybe<CreateCatalog>;
  create_data_access_model?: Maybe<CreateDataAccessModel>;
  create_dataset?: Maybe<CreateDataset>;
  create_dataset_rating?: Maybe<CreateDatasetRating>;
  create_external_access_model?: Maybe<CreateExternalAccessModel>;
  create_geography?: Maybe<CreateGeography>;
  create_license?: Maybe<CreateLicense>;
  create_license_addition?: Maybe<CreateLicenseAddition>;
  create_organization?: Maybe<CreateOrganization>;
  create_policy?: Maybe<CreatePolicy>;
  create_resource?: Maybe<CreateResource>;
  create_sector?: Maybe<CreateSector>;
  create_tag?: Maybe<CreateTag>;
  data_access_model_request?: Maybe<DataAccessModelRequestMutation>;
  data_request?: Maybe<DataRequestMutation>;
  dataset_access_model_request_user_migration?: Maybe<DatasetAccessModelRequestUserMigration>;
  delete_access_model_resource?: Maybe<DeleteAccessModelResource>;
  delete_additional_info?: Maybe<DeleteAdditionalInfo>;
  delete_api_source?: Maybe<DeleteApiSource>;
  delete_data_access_model?: Maybe<DeleteDataAccessModel>;
  delete_external_access_model?: Maybe<DeleteExternalAccessModel>;
  delete_license?: Maybe<DeleteLicense>;
  delete_organization_request?: Maybe<DeleteOrganizationRequestMutation>;
  delete_policy?: Maybe<DeletePolicy>;
  delete_resource?: Maybe<DeleteResource>;
  disable_data_access_model?: Maybe<DisableDataAccessModel>;
  edit_dataset?: Maybe<EditDataset>;
  moderation_request?: Maybe<ModerationRequestMutation>;
  open_data_request?: Maybe<OpenDataRequestMutation>;
  organization_request?: Maybe<OrganizationRequestMutation>;
  patch_dataset?: Maybe<PatchDataset>;
  patch_organization?: Maybe<PatchOrganization>;
  review_request?: Maybe<ReviewRequestMutation>;
  subscribe_mutation?: Maybe<SubscribeMutation>;
  update_access_model_resource?: Maybe<UpdateAccessModelResource>;
  update_additional_info?: Maybe<UpdateAdditionalInfo>;
  update_data_access_model?: Maybe<UpdateDataAccessModel>;
  update_data_request?: Maybe<DataRequestUpdateMutation>;
  update_dataset?: Maybe<UpdateDataset>;
  update_geography?: Maybe<UpdateGeography>;
  update_license?: Maybe<UpdateLicense>;
  update_license_addition?: Maybe<UpdateLicenseAddition>;
  update_organization?: Maybe<UpdateOrganization>;
  update_policy?: Maybe<UpdatePolicy>;
  update_resource?: Maybe<UpdateResource>;
  update_schema?: Maybe<UpdateSchema>;
  update_sector?: Maybe<UpdateSector>;
};


export type MutationAccess_Model_ResourceArgs = {
  access_model_resource_data?: InputMaybe<AccessModelResourceInput>;
};


export type MutationAddress_Moderation_RequestsArgs = {
  moderation_request?: InputMaybe<ModerationRequestsApproveRejectInput>;
};


export type MutationAgreement_RequestArgs = {
  agreement_request?: InputMaybe<AgreementInput>;
};


export type MutationApprove_Reject_Data_Access_Model_RequestArgs = {
  data_access_model_request?: InputMaybe<DataAccessModelRequestUpdateInput>;
};


export type MutationApprove_Reject_Dataset_RatingArgs = {
  rating_data: DatasetRatingApproveRejectInput;
};


export type MutationApprove_Reject_LicenseArgs = {
  license_data: LicenseApproveRejectInput;
};


export type MutationApprove_Reject_License_AdditionArgs = {
  additions_data: LicenseAdditionApproveRejectInput;
};


export type MutationApprove_Reject_Moderation_RequestsArgs = {
  moderation_request?: InputMaybe<ModerationRequestsApproveRejectInput>;
};


export type MutationApprove_Reject_Organization_ApprovalArgs = {
  organization_data: ApproveRejectOrganizationApprovalInput;
};


export type MutationApprove_Reject_Organization_RequestArgs = {
  organization_request?: InputMaybe<OrganizationRequestUpdateInput>;
};


export type MutationApprove_Reject_PolicyArgs = {
  policy_data: PolicyApproveRejectInput;
};


export type MutationApprove_Reject_Review_RequestArgs = {
  review_request?: InputMaybe<ReviewRequestsApproveRejectInput>;
};


export type MutationCreate_Additional_InfoArgs = {
  info_data?: InputMaybe<AdditionalInfoInput>;
};


export type MutationCreate_Api_SourceArgs = {
  api_source_data: ApiSourceInput;
};


export type MutationCreate_CatalogArgs = {
  catalog_data: CatalogInput;
};


export type MutationCreate_Data_Access_ModelArgs = {
  data_access_model_data?: InputMaybe<DataAccessModelInput>;
};


export type MutationCreate_DatasetArgs = {
  dataset_data?: InputMaybe<CreateDatasetInput>;
};


export type MutationCreate_Dataset_RatingArgs = {
  rating_data: DatasetRatingInput;
};


export type MutationCreate_External_Access_ModelArgs = {
  external_access_model_data?: InputMaybe<ExternalAccessModelInput>;
};


export type MutationCreate_GeographyArgs = {
  geography_data: GeographyInput;
};


export type MutationCreate_LicenseArgs = {
  license_data: LicenseInput;
};


export type MutationCreate_License_AdditionArgs = {
  license_addition_data: LicenseAdditionsCreateInput;
};


export type MutationCreate_OrganizationArgs = {
  organization_data: OrganizationInput;
};


export type MutationCreate_PolicyArgs = {
  policy_data: PolicyInput;
};


export type MutationCreate_ResourceArgs = {
  resource_data?: InputMaybe<ResourceInput>;
};


export type MutationCreate_SectorArgs = {
  sector_data: SectorInput;
};


export type MutationCreate_TagArgs = {
  tag_data: TagInput;
};


export type MutationData_Access_Model_RequestArgs = {
  data_access_model_request?: InputMaybe<DataAccessModelRequestInput>;
};


export type MutationData_RequestArgs = {
  data_request?: InputMaybe<DataRequestInput>;
};


export type MutationDataset_Access_Model_Request_User_MigrationArgs = {
  data_access_model_request?: InputMaybe<UserMigrationInput>;
};


export type MutationDelete_Access_Model_ResourceArgs = {
  access_model_resource_data?: InputMaybe<DeleteAccessModelResourceInput>;
};


export type MutationDelete_Additional_InfoArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDelete_Api_SourceArgs = {
  api_source_id: Scalars['Int'];
};


export type MutationDelete_Data_Access_ModelArgs = {
  data_access_model_data?: InputMaybe<DeleteDataAccessModelInput>;
};


export type MutationDelete_External_Access_ModelArgs = {
  external_access_model_data?: InputMaybe<DeleteExternalAccessModelInput>;
};


export type MutationDelete_LicenseArgs = {
  license_id: Scalars['ID'];
};


export type MutationDelete_Organization_RequestArgs = {
  delete_organization_request?: InputMaybe<OrganizationRequestUpdateInput>;
};


export type MutationDelete_PolicyArgs = {
  policy_id: Scalars['ID'];
};


export type MutationDelete_ResourceArgs = {
  resource_data?: InputMaybe<DeleteResourceInput>;
};


export type MutationDisable_Data_Access_ModelArgs = {
  data_access_model_data?: InputMaybe<DisableDataAccessModelInput>;
};


export type MutationEdit_DatasetArgs = {
  dataset_data?: InputMaybe<EditDatasetInput>;
};


export type MutationModeration_RequestArgs = {
  moderation_request?: InputMaybe<ModerationRequestInput>;
};


export type MutationOpen_Data_RequestArgs = {
  data_request?: InputMaybe<OpenDataRequestInput>;
};


export type MutationOrganization_RequestArgs = {
  organization_request?: InputMaybe<OrganizationRequestInput>;
};


export type MutationPatch_DatasetArgs = {
  dataset_data?: InputMaybe<PatchDatasetInput>;
};


export type MutationPatch_OrganizationArgs = {
  organization_data: OrganizationPatchInput;
};


export type MutationReview_RequestArgs = {
  review_request?: InputMaybe<ReviewRequestInput>;
};


export type MutationSubscribe_MutationArgs = {
  subscribe_input: SubscribeInput;
};


export type MutationUpdate_Access_Model_ResourceArgs = {
  access_model_resource_data?: InputMaybe<AccessModelResourceInput>;
};


export type MutationUpdate_Additional_InfoArgs = {
  info_data: AdditionalInfoInput;
};


export type MutationUpdate_Data_Access_ModelArgs = {
  data_access_model_data?: InputMaybe<DataAccessModelInput>;
};


export type MutationUpdate_Data_RequestArgs = {
  data_request?: InputMaybe<DataRequestUpdateInput>;
};


export type MutationUpdate_DatasetArgs = {
  dataset_data?: InputMaybe<UpdateDatasetInput>;
};


export type MutationUpdate_GeographyArgs = {
  geography_data: GeographyInput;
};


export type MutationUpdate_LicenseArgs = {
  license_data: LicenseInput;
};


export type MutationUpdate_License_AdditionArgs = {
  license_addition_data: LicenseAdditionsCreateInput;
};


export type MutationUpdate_OrganizationArgs = {
  organization_data: OrganizationInput;
};


export type MutationUpdate_PolicyArgs = {
  policy_data: PolicyInput;
};


export type MutationUpdate_ResourceArgs = {
  resource_data: ResourceInput;
};


export type MutationUpdate_SchemaArgs = {
  resource_data: UpdateSchemaInput;
};


export type MutationUpdate_SectorArgs = {
  sector_data: SectorInput;
};

export type OpenDataRequestInput = {
  dataset_access_model: Scalars['ID'];
  resource: Scalars['ID'];
};

export type OpenDataRequestMutation = {
  __typename?: 'OpenDataRequestMutation';
  data_request?: Maybe<DataRequestType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type OrgDpaType = {
  __typename?: 'OrgDpaType';
  address?: Maybe<Scalars['String']>;
  cdo_notification: Scalars['String'];
  contact_email?: Maybe<Scalars['String']>;
  data_description?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  dpa_designation?: Maybe<Scalars['String']>;
  dpa_email?: Maybe<Scalars['String']>;
  dpa_name?: Maybe<Scalars['String']>;
  dpa_phone?: Maybe<Scalars['String']>;
  homepage: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  logo?: Maybe<Scalars['String']>;
  modified: Scalars['DateTime'];
  new_cdo_notification: Scalars['String'];
  new_dpa: Scalars['String'];
  ogd_tid?: Maybe<Scalars['Int']>;
  old_dpa?: Maybe<Scalars['String']>;
  org_id?: Maybe<OrganizationType>;
  organization_ptr: OrganizationType;
  organization_subtypes?: Maybe<OrganizationCreateRequestOrganizationSubtypes>;
  organization_types: OrganizationOrganizationTypes;
  organizationcreaterequest_ptr: CreateOrganizationType;
  parent?: Maybe<OrganizationType>;
  remark?: Maybe<Scalars['String']>;
  sample_data_url: Scalars['String'];
  state?: Maybe<GeographyType>;
  status: OrganizationCreateRequestStatus;
  title: Scalars['String'];
  upload_sample_data_file: Scalars['String'];
  username: Scalars['String'];
};

export type OrgItem = {
  __typename?: 'OrgItem';
  dpa_email?: Maybe<Scalars['String']>;
  org_id?: Maybe<Scalars['String']>;
  parent?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export enum OrganizationCreateRequestOrganizationSubtypes {
  /** Department */
  Department = 'DEPARTMENT',
  /** Ministry */
  Ministry = 'MINISTRY',
  /** Organisation */
  Organisation = 'ORGANISATION',
  /** Other */
  Other = 'OTHER'
}

export enum OrganizationCreateRequestStatus {
  /** Approved */
  Approved = 'APPROVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Rejected */
  Rejected = 'REJECTED',
  /** Requested */
  Requested = 'REQUESTED'
}

export enum OrganizationCreationStatusType {
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type OrganizationInput = {
  address?: InputMaybe<Scalars['String']>;
  cdo_notification?: InputMaybe<Scalars['Upload']>;
  contact?: InputMaybe<Scalars['String']>;
  data_description?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  dpa_email?: InputMaybe<Scalars['String']>;
  gov_sub_type?: InputMaybe<OrganizationSubTypes>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** Logo for the Company. */
  logo?: InputMaybe<Scalars['Upload']>;
  ogd_tid?: InputMaybe<Scalars['Int']>;
  organization_types: OrganizationTypes;
  parent_id?: InputMaybe<Scalars['ID']>;
  sample_data_url?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  upload_sample_data_file?: InputMaybe<Scalars['Upload']>;
};

export enum OrganizationOrganizationTypes {
  /** Academic Institution */
  AcademicInstitution = 'ACADEMIC_INSTITUTION',
  /** Central Government */
  CentralGovernment = 'CENTRAL_GOVERNMENT',
  /** Citizens Group */
  CitizensGroup = 'CITIZENS_GROUP',
  /** Civil Society Organisation */
  CivilSocietyOrganisation = 'CIVIL_SOCIETY_ORGANISATION',
  /** Corporations */
  Corporations = 'CORPORATIONS',
  /** Government */
  Government = 'GOVERNMENT',
  /** Industry Body */
  IndustryBody = 'INDUSTRY_BODY',
  /** Media Organisation */
  MediaOrganisation = 'MEDIA_ORGANISATION',
  /** Ngo */
  Ngo = 'NGO',
  /** Open Data Technology Community */
  OpenDataTechnologyCommunity = 'OPEN_DATA_TECHNOLOGY_COMMUNITY',
  /** Others */
  Others = 'OTHERS',
  /** Private Company */
  PrivateCompany = 'PRIVATE_COMPANY',
  /** Public Sector Company */
  PublicSectorCompany = 'PUBLIC_SECTOR_COMPANY',
  /** Startup */
  Startup = 'STARTUP',
  /** State Government */
  StateGovernment = 'STATE_GOVERNMENT',
  /** Union Territory Government */
  UnionTerritoryGovernment = 'UNION_TERRITORY_GOVERNMENT',
  /** Urban Local Body */
  UrbanLocalBody = 'URBAN_LOCAL_BODY'
}

export type OrganizationPatchInput = {
  address?: InputMaybe<Scalars['String']>;
  cdo_notification?: InputMaybe<Scalars['Upload']>;
  contact?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dpa_designation?: InputMaybe<Scalars['String']>;
  dpa_email?: InputMaybe<Scalars['String']>;
  dpa_name?: InputMaybe<Scalars['String']>;
  dpa_phone?: InputMaybe<Scalars['String']>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** Logo for the Company. */
  logo?: InputMaybe<Scalars['Upload']>;
  title?: InputMaybe<Scalars['String']>;
};

export type OrganizationRequestInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  organization: Scalars['ID'];
  user_email: Scalars['String'];
};

export type OrganizationRequestMutation = {
  __typename?: 'OrganizationRequestMutation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  organization_request?: Maybe<OrganizationRequestType>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum OrganizationRequestStatus {
  /** Approved */
  Approved = 'APPROVED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Rejected */
  Rejected = 'REJECTED',
  /** Requested */
  Requested = 'REQUESTED'
}

export enum OrganizationRequestStatusType {
  Approved = 'APPROVED',
  Deleted = 'DELETED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type OrganizationRequestType = {
  __typename?: 'OrganizationRequestType';
  description: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  organization: OrganizationType;
  remark?: Maybe<Scalars['String']>;
  status: OrganizationRequestStatus;
  user?: Maybe<Scalars['String']>;
  user_email: Scalars['String'];
};

export type OrganizationRequestUpdateInput = {
  id: Scalars['ID'];
  remark?: InputMaybe<Scalars['String']>;
  status: OrganizationRequestStatusType;
  username?: InputMaybe<Scalars['String']>;
};

export enum OrganizationSubTypes {
  Department = 'DEPARTMENT',
  Ministry = 'MINISTRY',
  Organisation = 'ORGANISATION',
  Other = 'OTHER'
}

export type OrganizationType = {
  __typename?: 'OrganizationType';
  api_count?: Maybe<Scalars['Int']>;
  apisource_set: Array<ApiSourceType>;
  average_rating?: Maybe<Scalars['Float']>;
  catalog_set: Array<CatalogType>;
  contact_email?: Maybe<Scalars['String']>;
  dam_count?: Maybe<Scalars['Int']>;
  dataaccessmodel_set: Array<DataAccessModelType>;
  dataset_count?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  homepage: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  license_set: Array<LicenseType>;
  logo?: Maybe<Scalars['String']>;
  modified: Scalars['DateTime'];
  organization_types: OrganizationOrganizationTypes;
  organizationcreaterequest?: Maybe<CreateOrganizationType>;
  organizationrequest_set: Array<OrganizationRequestType>;
  orgdpahistory_set: Array<OrgDpaType>;
  parent?: Maybe<OrganizationType>;
  parent_field: Array<OrganizationType>;
  policy_set: Array<PolicyType>;
  title: Scalars['String'];
  usecase_count?: Maybe<Scalars['Int']>;
  user_count?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export enum OrganizationTypes {
  AcademicInstitution = 'ACADEMIC_INSTITUTION',
  CentralGovernment = 'CENTRAL_GOVERNMENT',
  CitizensGroup = 'CITIZENS_GROUP',
  CivilSocietyOrganisation = 'CIVIL_SOCIETY_ORGANISATION',
  Corporations = 'CORPORATIONS',
  Government = 'GOVERNMENT',
  IndustryBody = 'INDUSTRY_BODY',
  MediaOrganisation = 'MEDIA_ORGANISATION',
  Ngo = 'NGO',
  OpenDataTechnologyCommunity = 'OPEN_DATA_TECHNOLOGY_COMMUNITY',
  Others = 'OTHERS',
  PrivateCompany = 'PRIVATE_COMPANY',
  PublicSectorCompany = 'PUBLIC_SECTOR_COMPANY',
  Startup = 'STARTUP',
  StateGovernment = 'STATE_GOVERNMENT',
  UnionTerritoryGovernment = 'UNION_TERRITORY_GOVERNMENT',
  UrbanLocalBody = 'URBAN_LOCAL_BODY'
}

export type OrgsItem = {
  __typename?: 'OrgsItem';
  org_id?: Maybe<Scalars['String']>;
  org_title?: Maybe<Scalars['String']>;
};

export enum Paymenttypes {
  Free = 'FREE',
  Paid = 'PAID'
}

export type ParameterKeyValueType = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export enum ParameterTypes {
  Download = 'DOWNLOAD',
  Exposed = 'EXPOSED',
  Pagination = 'PAGINATION',
  Preview = 'PREVIEW'
}

export type PatchDataset = {
  __typename?: 'PatchDataset';
  dataset?: Maybe<DatasetType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PatchDatasetInput = {
  description?: InputMaybe<Scalars['String']>;
  funnel?: InputMaybe<Scalars['String']>;
  hvd_rating?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PatchOrganization = {
  __typename?: 'PatchOrganization';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  organization?: Maybe<CreateOrganizationType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PolicyApproveRejectInput = {
  id: Scalars['ID'];
  reject_reason?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
};

export type PolicyInput = {
  description: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  id?: InputMaybe<Scalars['ID']>;
  remote_url?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};

export enum PolicyStatus {
  /** Published */
  Published = 'PUBLISHED',
  /** Rejected */
  Rejected = 'REJECTED',
  /** Requested */
  Requested = 'REQUESTED'
}

export type PolicyType = {
  __typename?: 'PolicyType';
  datasetaccessmodel_set: Array<DatasetAccessModelType>;
  description: Scalars['String'];
  externalaccessmodel_set: Array<ExternalAccessModelType>;
  file: Scalars['String'];
  id: Scalars['ID'];
  issued: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  organization?: Maybe<OrganizationType>;
  reject_reason: Scalars['String'];
  remote_url: Scalars['String'];
  status: PolicyStatus;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type ProviderAdminItem = {
  __typename?: 'ProviderAdminItem';
  cdo_notif?: Maybe<Scalars['String']>;
  dp_count?: Maybe<Scalars['Int']>;
  dpa_list?: Maybe<Array<Maybe<OrgDpaType>>>;
  org_dataset_count?: Maybe<Scalars['Int']>;
  org_id?: Maybe<Scalars['String']>;
  org_title?: Maybe<Scalars['String']>;
  provider_email?: Maybe<Scalars['String']>;
  provider_name?: Maybe<Scalars['String']>;
  provider_user_name?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
  user_org_dataset_count?: Maybe<Scalars['Int']>;
};

export type ProviderItem = {
  __typename?: 'ProviderItem';
  dataset_count?: Maybe<Scalars['Int']>;
  dataset_list?: Maybe<Array<Maybe<DatasetType>>>;
  dpa_email?: Maybe<Scalars['String']>;
  dpa_name?: Maybe<Scalars['String']>;
  org_id?: Maybe<Scalars['String']>;
  org_title?: Maybe<Scalars['String']>;
  provider_email?: Maybe<Scalars['String']>;
  provider_name?: Maybe<Scalars['String']>;
  provider_user_name?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
};

export enum PurposeType {
  Academia = 'ACADEMIA',
  Business = 'BUSINESS',
  GovernmentUse = 'GOVERNMENT_USE',
  Journalism = 'JOURNALISM',
  Others = 'OTHERS',
  RD = 'R_D'
}

export type Query = {
  __typename?: 'Query';
  active_sector?: Maybe<Array<Maybe<SectorType>>>;
  all_api_source?: Maybe<Array<Maybe<ApiSourceType>>>;
  all_api_source_by_org?: Maybe<Array<Maybe<ApiSourceType>>>;
  all_catalog?: Maybe<Array<Maybe<CatalogType>>>;
  all_data_access_model_requests?: Maybe<Array<Maybe<DataAccessModelRequestType>>>;
  all_data_access_models?: Maybe<Array<Maybe<DataAccessModelType>>>;
  all_data_requests?: Maybe<Array<Maybe<DataRequestType>>>;
  all_dataset_filters?: Maybe<Filters>;
  all_dataset_ratings?: Maybe<Array<Maybe<DatasetRatingType>>>;
  all_datasets?: Maybe<Array<Maybe<DatasetType>>>;
  all_external_access_models?: Maybe<Array<Maybe<ExternalAccessModelType>>>;
  all_geography?: Maybe<Array<Maybe<GeographyType>>>;
  all_info?: Maybe<Array<Maybe<AdditionalInfoType>>>;
  all_license?: Maybe<Array<Maybe<LicenseType>>>;
  all_license_additions?: Maybe<Array<Maybe<LicenseAdditionType>>>;
  all_moderation_requests?: Maybe<Array<Maybe<ModerationRequestType>>>;
  all_organization_requests?: Maybe<Array<Maybe<OrganizationRequestType>>>;
  all_organizations?: Maybe<Array<Maybe<OrganizationType>>>;
  all_organizations_hierarchy?: Maybe<Array<Maybe<OrgItem>>>;
  all_pending_data_access_model_requests?: Maybe<Array<Maybe<DataAccessModelRequestType>>>;
  all_policy?: Maybe<Array<Maybe<PolicyType>>>;
  all_provider_admins?: Maybe<Array<Maybe<ProviderAdminItem>>>;
  all_providers?: Maybe<Array<Maybe<ProviderItem>>>;
  all_resources?: Maybe<Array<Maybe<ResourceType>>>;
  all_review_requests?: Maybe<Array<Maybe<ReviewRequestType>>>;
  all_sector?: Maybe<Array<Maybe<SectorType>>>;
  all_subscriptions?: Maybe<Array<Maybe<SubscribeType>>>;
  all_tag?: Maybe<Array<Maybe<TagType>>>;
  all_users?: Maybe<Array<Maybe<UserItem>>>;
  api_source?: Maybe<ApiSourceType>;
  approved_policy?: Maybe<Array<Maybe<PolicyType>>>;
  catalog?: Maybe<CatalogType>;
  data_access_model?: Maybe<DataAccessModelType>;
  data_access_model_request?: Maybe<DataAccessModelRequestType>;
  data_access_model_request_org?: Maybe<Array<Maybe<DataAccessModelRequestType>>>;
  data_access_model_request_user?: Maybe<Array<Maybe<DataAccessModelRequestType>>>;
  data_request?: Maybe<DataRequestType>;
  data_request_user?: Maybe<DataRequestType>;
  data_spec?: Maybe<Scalars['JSONString']>;
  dataset?: Maybe<DatasetType>;
  dataset_access_model?: Maybe<Array<Maybe<DatasetAccessModelType>>>;
  dataset_access_model_by_id?: Maybe<DatasetAccessModelType>;
  dataset_by_downloads?: Maybe<Array<Maybe<DatasetType>>>;
  dataset_by_slug?: Maybe<DatasetType>;
  dataset_by_title?: Maybe<DatasetType>;
  dataset_count_org?: Maybe<Array<Maybe<DatasetCount>>>;
  dataset_rating?: Maybe<Array<Maybe<DatasetRatingType>>>;
  dept_by_ministry?: Maybe<Array<Maybe<OrganizationType>>>;
  entity_by_state?: Maybe<Array<Maybe<OrganizationType>>>;
  external_access_model_by_dataset?: Maybe<ExternalAccessModelType>;
  geography?: Maybe<GeographyType>;
  info?: Maybe<AdditionalInfoType>;
  license?: Maybe<LicenseType>;
  license_addition?: Maybe<LicenseAdditionType>;
  license_additions_by_org?: Maybe<Array<Maybe<LicenseAdditionType>>>;
  license_by_org?: Maybe<Array<Maybe<LicenseType>>>;
  licenses?: Maybe<Array<Maybe<LicenseType>>>;
  ministries_by_state?: Maybe<Array<Maybe<OrganizationType>>>;
  moderation_request?: Maybe<ModerationRequestType>;
  moderation_request_user?: Maybe<Array<Maybe<ModerationRequestType>>>;
  org_activity?: Maybe<Array<Maybe<ActivityType>>>;
  org_data_access_models?: Maybe<Array<Maybe<DataAccessModelType>>>;
  org_datasets?: Maybe<Array<Maybe<DatasetType>>>;
  organization_by_id?: Maybe<OrganizationType>;
  organization_by_tid?: Maybe<OrganizationType>;
  organization_by_title?: Maybe<Array<Maybe<OrganizationType>>>;
  organization_request?: Maybe<OrganizationRequestType>;
  organization_request_user?: Maybe<Array<Maybe<OrganizationRequestType>>>;
  organization_without_dpa?: Maybe<Array<Maybe<OrganizationType>>>;
  organizations?: Maybe<Array<Maybe<OrganizationType>>>;
  organizations_by_user?: Maybe<Array<Maybe<OrganizationType>>>;
  organizations_child?: Maybe<Array<Maybe<OrganizationType>>>;
  policy_by_id?: Maybe<PolicyType>;
  policy_by_org?: Maybe<Array<Maybe<PolicyType>>>;
  published_organization_by_id?: Maybe<OrganizationType>;
  rating?: Maybe<DatasetRatingType>;
  rating_by_org?: Maybe<Array<Maybe<DatasetRatingType>>>;
  requested_rejected_organizations?: Maybe<Array<Maybe<OrganizationType>>>;
  resource?: Maybe<ResourceType>;
  resource_columns?: Maybe<Array<Maybe<Scalars['String']>>>;
  resource_dataset?: Maybe<Array<Maybe<ResourceType>>>;
  review_request?: Maybe<ReviewRequestType>;
  review_request_user?: Maybe<Array<Maybe<ModerationRequestType>>>;
  sector?: Maybe<SectorType>;
  sector_by_title?: Maybe<SectorType>;
  stat_count?: Maybe<StatsType>;
  sub_geographies?: Maybe<Array<Maybe<GeographyType>>>;
  subscribe?: Maybe<SubscribeType>;
  tag?: Maybe<TagType>;
  user_activity?: Maybe<Array<Maybe<ActivityType>>>;
  user_dataset_subscription?: Maybe<SubscribeType>;
  user_subscriptions?: Maybe<Array<Maybe<SubscribeType>>>;
};


export type QueryAll_Data_Access_Model_RequestsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryAll_DatasetsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryAll_Pending_Data_Access_Model_RequestsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryAll_ProvidersArgs = {
  org_id?: InputMaybe<Scalars['Int']>;
};


export type QueryApi_SourceArgs = {
  api_source_id?: InputMaybe<Scalars['Int']>;
};


export type QueryCatalogArgs = {
  catalog_id?: InputMaybe<Scalars['Int']>;
};


export type QueryData_Access_ModelArgs = {
  data_access_model_id?: InputMaybe<Scalars['ID']>;
};


export type QueryData_Access_Model_RequestArgs = {
  data_access_model_request_id?: InputMaybe<Scalars['Int']>;
};


export type QueryData_Access_Model_Request_OrgArgs = {
  org_id?: InputMaybe<Scalars['Int']>;
};


export type QueryData_RequestArgs = {
  data_request_id?: InputMaybe<Scalars['UUID']>;
};


export type QueryData_SpecArgs = {
  dataset_access_model_request_id?: InputMaybe<Scalars['ID']>;
  dataset_access_model_resource_id: Scalars['ID'];
  resource_id: Scalars['ID'];
};


export type QueryDatasetArgs = {
  dataset_id?: InputMaybe<Scalars['Int']>;
};


export type QueryDataset_Access_ModelArgs = {
  anonymous_users?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  dataset_id?: InputMaybe<Scalars['ID']>;
};


export type QueryDataset_Access_Model_By_IdArgs = {
  dataset_access_model_id?: InputMaybe<Scalars['ID']>;
};


export type QueryDataset_By_DownloadsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  frm?: InputMaybe<Scalars['String']>;
  geo?: InputMaybe<Scalars['String']>;
  hvd?: InputMaybe<Scalars['Boolean']>;
  org?: InputMaybe<Scalars['String']>;
  sector?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['String']>;
};


export type QueryDataset_By_SlugArgs = {
  dataset_slug?: InputMaybe<Scalars['String']>;
};


export type QueryDataset_By_TitleArgs = {
  dataset_title?: InputMaybe<Scalars['String']>;
};


export type QueryDataset_Count_OrgArgs = {
  by?: InputMaybe<Scalars['String']>;
  frm?: InputMaybe<Scalars['String']>;
  geo?: InputMaybe<Scalars['String']>;
  org?: InputMaybe<Scalars['String']>;
  sector?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};


export type QueryDataset_RatingArgs = {
  dataset_id?: InputMaybe<Scalars['Int']>;
};


export type QueryDept_By_MinistryArgs = {
  organization_id?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['String']>;
};


export type QueryEntity_By_StateArgs = {
  entity_type?: InputMaybe<Scalars['String']>;
  parent_id?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};


export type QueryExternal_Access_Model_By_DatasetArgs = {
  dataset_id?: InputMaybe<Scalars['ID']>;
};


export type QueryGeographyArgs = {
  geography_id?: InputMaybe<Scalars['Int']>;
};


export type QueryInfoArgs = {
  info_id?: InputMaybe<Scalars['Int']>;
};


export type QueryLicenseArgs = {
  license_id?: InputMaybe<Scalars['Int']>;
};


export type QueryLicense_AdditionArgs = {
  license_id?: InputMaybe<Scalars['Int']>;
};


export type QueryMinistries_By_StateArgs = {
  state?: InputMaybe<Scalars['String']>;
};


export type QueryModeration_RequestArgs = {
  moderation_request_id?: InputMaybe<Scalars['Int']>;
};


export type QueryOrg_ActivityArgs = {
  filters?: InputMaybe<Array<InputMaybe<ActivityFilter>>>;
  first?: InputMaybe<Scalars['Int']>;
  organization_id?: InputMaybe<Scalars['ID']>;
  search_query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryOrg_Data_Access_ModelsArgs = {
  organization_id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrg_DatasetsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<DatasetStatus>;
};


export type QueryOrganization_By_IdArgs = {
  organization_id?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganization_By_TidArgs = {
  organization_tid?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganization_By_TitleArgs = {
  organization_title?: InputMaybe<Scalars['String']>;
};


export type QueryOrganization_RequestArgs = {
  organization_request_id?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganization_Without_DpaArgs = {
  organization_id?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganizations_ChildArgs = {
  organization_id?: InputMaybe<Scalars['Int']>;
};


export type QueryPolicy_By_IdArgs = {
  policy_id?: InputMaybe<Scalars['Int']>;
};


export type QueryPublished_Organization_By_IdArgs = {
  organization_id?: InputMaybe<Scalars['Int']>;
};


export type QueryRatingArgs = {
  dataset_rating_id?: InputMaybe<Scalars['Int']>;
};


export type QueryResourceArgs = {
  resource_id?: InputMaybe<Scalars['Int']>;
};


export type QueryResource_ColumnsArgs = {
  resource_id?: InputMaybe<Scalars['Int']>;
};


export type QueryResource_DatasetArgs = {
  dataset_id?: InputMaybe<Scalars['Int']>;
};


export type QueryReview_RequestArgs = {
  review_request_id?: InputMaybe<Scalars['Int']>;
};


export type QuerySectorArgs = {
  sector_id?: InputMaybe<Scalars['Int']>;
};


export type QuerySector_By_TitleArgs = {
  sector_title?: InputMaybe<Scalars['String']>;
};


export type QuerySub_GeographiesArgs = {
  parent_id?: InputMaybe<Scalars['Int']>;
};


export type QuerySubscribeArgs = {
  subscribe_id?: InputMaybe<Scalars['Int']>;
};


export type QueryTagArgs = {
  tag_id?: InputMaybe<Scalars['Int']>;
};


export type QueryUser_ActivityArgs = {
  filters?: InputMaybe<Array<InputMaybe<ActivityFilter>>>;
  first?: InputMaybe<Scalars['Int']>;
  search_query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['String']>;
};


export type QueryUser_Dataset_SubscriptionArgs = {
  dataset_id?: InputMaybe<Scalars['Int']>;
};

export enum RateLimitUnits {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Second = 'SECOND',
  Week = 'WEEK',
  Year = 'YEAR'
}

export enum RatingStatus {
  Created = 'CREATED',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED'
}

export enum RequestType {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT'
}

export type ResourceFieldInput = {
  fields: Array<InputMaybe<Scalars['String']>>;
  parameters?: InputMaybe<Array<InputMaybe<ParameterKeyValueType>>>;
  resource_id: Scalars['ID'];
  sample_enabled?: InputMaybe<Scalars['Boolean']>;
  sample_rows?: InputMaybe<Scalars['Int']>;
};

export type ResourceInput = {
  api_details?: InputMaybe<ApiInputType>;
  byte_size?: InputMaybe<Scalars['Float']>;
  checksum?: InputMaybe<Scalars['String']>;
  compression_format?: InputMaybe<Scalars['String']>;
  dataset: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['String']>;
  file_details?: InputMaybe<FileInputType>;
  id?: InputMaybe<Scalars['ID']>;
  is_downloadable?: InputMaybe<Scalars['String']>;
  is_large_data?: InputMaybe<Scalars['Boolean']>;
  masked_fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  media_type?: InputMaybe<Scalars['String']>;
  packaging_format?: InputMaybe<Scalars['String']>;
  release_date?: InputMaybe<Scalars['Date']>;
  schema?: InputMaybe<Array<InputMaybe<ResourceSchemaInputType>>>;
  status: Scalars['String'];
  title: Scalars['String'];
};

export type ResourceSchemaInputType = {
  array_field?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  filterable?: InputMaybe<Scalars['Boolean']>;
  format?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['String']>;
  parent_path?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
};

export type ResourceSchemaType = {
  __typename?: 'ResourceSchemaType';
  array_field?: Maybe<ResourceSchemaType>;
  array_item: Array<ResourceSchemaType>;
  datasetaccessmodelresource_set: Array<AccessModelResourceType>;
  description: Scalars['String'];
  display_name: Scalars['String'];
  filterable: Scalars['Boolean'];
  format: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  parent?: Maybe<ResourceSchemaType>;
  parent_field: Array<ResourceSchemaType>;
  parent_path?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  resource: ResourceType;
};

export type ResourceType = {
  __typename?: 'ResourceType';
  api_details?: Maybe<ApiDetailsType>;
  apidetails?: Maybe<ApiDetailsType>;
  byte_size?: Maybe<Scalars['Float']>;
  checksum?: Maybe<Scalars['String']>;
  compression_format?: Maybe<Scalars['String']>;
  datarequest_set: Array<DataRequestType>;
  dataset: DatasetType;
  datasetaccessmodelresource_set: Array<AccessModelResourceType>;
  description: Scalars['String'];
  external_url?: Maybe<Scalars['String']>;
  file_details?: Maybe<FileDetailsType>;
  filedetails?: Maybe<FileDetailsType>;
  id: Scalars['ID'];
  is_downloadable: Scalars['Boolean'];
  is_large_data: Scalars['Boolean'];
  issued: Scalars['DateTime'];
  masked_fields?: Maybe<Array<Scalars['String']>>;
  media_type?: Maybe<Scalars['String']>;
  modified: Scalars['DateTime'];
  packaging_format?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['Date']>;
  resourceschema_set: Array<ResourceSchemaType>;
  schema?: Maybe<Array<Maybe<ResourceSchemaType>>>;
  schema_exists?: Maybe<Scalars['Boolean']>;
  status: Scalars['String'];
  title: Scalars['String'];
};

export enum ResponseType {
  Csv = 'CSV',
  Json = 'JSON',
  Xml = 'XML'
}

export type ReviewRequestInput = {
  dataset: Scalars['ID'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<StatusType>;
};

export type ReviewRequestMutation = {
  __typename?: 'ReviewRequestMutation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  review_request?: Maybe<ReviewRequestType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ReviewRequestType = {
  __typename?: 'ReviewRequestType';
  creation_date: Scalars['DateTime'];
  dataset: DatasetType;
  description: Scalars['String'];
  id: Scalars['ID'];
  modified_date: Scalars['DateTime'];
  parent?: Maybe<ReviewRequestType>;
  parent_field: Array<ReviewRequestType>;
  reject_reason: Scalars['String'];
  remark: Scalars['String'];
  request_type: DatasetReviewRequestRequestType;
  status: Scalars['String'];
  user: Scalars['String'];
};

export type ReviewRequestsApproveRejectInput = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  remark?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusType>;
};

export type SectorInput = {
  description?: InputMaybe<Scalars['String']>;
  highlights?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  official_id?: InputMaybe<Scalars['String']>;
  parent_id?: InputMaybe<Scalars['String']>;
};

export type SectorItem = {
  __typename?: 'SectorItem';
  sector_id?: Maybe<Scalars['String']>;
  sector_name?: Maybe<Scalars['String']>;
};

export type SectorType = {
  __typename?: 'SectorType';
  api_count?: Maybe<Scalars['Int']>;
  dam_count?: Maybe<Scalars['Int']>;
  dataset_count?: Maybe<Scalars['Int']>;
  dataset_set: Array<DatasetType>;
  description: Scalars['String'];
  downloads?: Maybe<Scalars['Int']>;
  highlights?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  official_id?: Maybe<Scalars['String']>;
  organization_count?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<SectorType>;
  sector_set: Array<SectorType>;
};

export type StatsType = {
  __typename?: 'StatsType';
  api_count?: Maybe<Scalars['Int']>;
  dataset_count?: Maybe<Scalars['Int']>;
  geography_count?: Maybe<Scalars['Int']>;
  organization_count?: Maybe<Scalars['Int']>;
  sector_count?: Maybe<Scalars['Int']>;
};

export enum StatusType {
  Addressed = 'ADDRESSED',
  Addressing = 'ADDRESSING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type SubscribeInput = {
  action: SubscriptionAction;
  dataset_id: Scalars['ID'];
};

export type SubscribeMutation = {
  __typename?: 'SubscribeMutation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SubscribeType = {
  __typename?: 'SubscribeType';
  dataset: DatasetType;
  id: Scalars['ID'];
  user: Scalars['String'];
};

export enum SubscriptionAction {
  Subscribe = 'SUBSCRIBE',
  Unsubscribe = 'UNSUBSCRIBE'
}

export enum SubscriptionUnits {
  Daily = 'DAILY',
  Limiteddownload = 'LIMITEDDOWNLOAD',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type TagInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type TagType = {
  __typename?: 'TagType';
  dataset_set: Array<DatasetType>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateAccessModelResource = {
  __typename?: 'UpdateAccessModelResource';
  access_model_resource?: Maybe<DatasetAccessModelType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateAdditionalInfo = {
  __typename?: 'UpdateAdditionalInfo';
  additional_info?: Maybe<AdditionalInfoType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateDataAccessModel = {
  __typename?: 'UpdateDataAccessModel';
  data_access_model?: Maybe<DataAccessModelType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateDataset = {
  __typename?: 'UpdateDataset';
  dataset?: Maybe<DatasetType>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateDatasetInput = {
  action?: InputMaybe<Scalars['String']>;
  confirms_to?: InputMaybe<Scalars['String']>;
  contact_point?: InputMaybe<Scalars['String']>;
  funnel?: InputMaybe<Scalars['String']>;
  geo_list: Array<InputMaybe<Scalars['String']>>;
  highlights?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['ID']>;
  in_series?: InputMaybe<Scalars['String']>;
  is_datedynamic?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  period_from?: InputMaybe<Scalars['Date']>;
  period_to?: InputMaybe<Scalars['Date']>;
  qualified_attribution?: InputMaybe<Scalars['String']>;
  remote_issued: Scalars['Date'];
  remote_modified?: InputMaybe<Scalars['Date']>;
  sector_list: Array<InputMaybe<Scalars['String']>>;
  source: Scalars['String'];
  spatial_coverage?: InputMaybe<Scalars['String']>;
  spatial_resolution?: InputMaybe<Scalars['String']>;
  tags_list?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  temporal_coverage?: InputMaybe<Scalars['String']>;
  temporal_resolution?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
  update_frequency: Scalars['String'];
};

export type UpdateGeography = {
  __typename?: 'UpdateGeography';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  geography?: Maybe<GeographyType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateLicense = {
  __typename?: 'UpdateLicense';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  license?: Maybe<LicenseType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateLicenseAddition = {
  __typename?: 'UpdateLicenseAddition';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  license?: Maybe<LicenseAdditionType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateOrganization = {
  __typename?: 'UpdateOrganization';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  organization?: Maybe<CreateOrganizationType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdatePolicy = {
  __typename?: 'UpdatePolicy';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  policy?: Maybe<PolicyType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateResource = {
  __typename?: 'UpdateResource';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  resource?: Maybe<ResourceType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateSchema = {
  __typename?: 'UpdateSchema';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  resource?: Maybe<ResourceType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateSchemaInput = {
  id?: InputMaybe<Scalars['ID']>;
  schema?: InputMaybe<Array<InputMaybe<ResourceSchemaInputType>>>;
};

export type UpdateSector = {
  __typename?: 'UpdateSector';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  sector?: Maybe<SectorType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserItem = {
  __typename?: 'UserItem';
  dataset_access_count?: Maybe<Scalars['Int']>;
  dataset_list?: Maybe<Array<Maybe<DatasetType>>>;
  date_joined?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ratings_user?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMigrationInput = {
  source_dam_id?: InputMaybe<Scalars['ID']>;
  target_dam_id?: InputMaybe<Scalars['ID']>;
  target_user?: InputMaybe<Scalars['String']>;
};

export enum ValidationUnits {
  Day = 'DAY',
  Lifetime = 'LIFETIME',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type AllDatasetsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDatasetsQueryQuery = { __typename?: 'Query', all_datasets?: Array<{ __typename?: 'DatasetType', id: string, title: string, slug?: string | null, period_from?: any | null, period_to?: any | null, description: string, issued: any, highlights?: Array<string | null> | null, update_frequency?: string | null, modified: any, tags: Array<{ __typename?: 'TagType', name: string, id: string }>, sector: Array<{ __typename?: 'SectorType', id: string, name: string, description: string, highlights?: Array<string | null> | null }>, catalog: { __typename?: 'CatalogType', organization: { __typename?: 'OrganizationType', title: string, logo?: string | null, homepage: string } }, resource_set: Array<{ __typename?: 'ResourceType', id: string, title: string, description: string, issued: any, modified: any, file_details?: { __typename?: 'FileDetailsType', format: string, file: string, source_file_name: string } | null }>, datasetaccessmodel_set: Array<{ __typename?: 'DatasetAccessModelType', data_access_model: { __typename?: 'DataAccessModelType', license: { __typename?: 'LicenseType', title: string } } }> } | null> | null };

export type DatasetBySlugQueryQueryVariables = Exact<{
  dataset_slug?: InputMaybe<Scalars['String']>;
}>;


export type DatasetBySlugQueryQuery = { __typename?: 'Query', dataset_by_slug?: { __typename?: 'DatasetType', id: string, title: string, description: string, issued: any, highlights?: Array<string | null> | null, remote_issued?: any | null, remote_modified?: any | null, period_from?: any | null, period_to?: any | null, update_frequency?: string | null, modified: any, sector: Array<{ __typename?: 'SectorType', id: string, name: string, description: string }>, catalog: { __typename?: 'CatalogType', id: string, title: string, organization: { __typename?: 'OrganizationType', title: string, logo?: string | null, homepage: string } }, tags: Array<{ __typename?: 'TagType', id: string, name: string }>, resource_set: Array<{ __typename?: 'ResourceType', id: string, title: string, description: string, issued: any, modified: any, status: string, byte_size?: number | null, release_date?: any | null, is_downloadable: boolean, file_details?: { __typename?: 'FileDetailsType', file: string, source_file_name: string, format: string } | null }>, datasetaccessmodel_set: Array<{ __typename?: 'DatasetAccessModelType', resource_formats?: Array<string | null> | null, data_access_model: { __typename?: 'DataAccessModelType', license: { __typename?: 'LicenseType', title: string, type?: string | null } } }> } | null };


export const AllDatasetsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allDatasetsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all_datasets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"period_from"}},{"kind":"Field","name":{"kind":"Name","value":"period_to"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"issued"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}},{"kind":"Field","name":{"kind":"Name","value":"update_frequency"}},{"kind":"Field","name":{"kind":"Name","value":"modified"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}}]}},{"kind":"Field","name":{"kind":"Name","value":"catalog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"homepage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resource_set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"issued"}},{"kind":"Field","name":{"kind":"Name","value":"modified"}},{"kind":"Field","name":{"kind":"Name","value":"file_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"source_file_name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"datasetaccessmodel_set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data_access_model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"license"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllDatasetsQueryQuery, AllDatasetsQueryQueryVariables>;
export const DatasetBySlugQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"datasetBySlugQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataset_slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataset_by_slug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dataset_slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataset_slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"issued"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}},{"kind":"Field","name":{"kind":"Name","value":"remote_issued"}},{"kind":"Field","name":{"kind":"Name","value":"remote_modified"}},{"kind":"Field","name":{"kind":"Name","value":"period_from"}},{"kind":"Field","name":{"kind":"Name","value":"period_to"}},{"kind":"Field","name":{"kind":"Name","value":"update_frequency"}},{"kind":"Field","name":{"kind":"Name","value":"modified"}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"catalog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"homepage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resource_set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"issued"}},{"kind":"Field","name":{"kind":"Name","value":"modified"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"byte_size"}},{"kind":"Field","name":{"kind":"Name","value":"release_date"}},{"kind":"Field","name":{"kind":"Name","value":"is_downloadable"}},{"kind":"Field","name":{"kind":"Name","value":"file_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"source_file_name"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"datasetaccessmodel_set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data_access_model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"license"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resource_formats"}}]}}]}}]}}]} as unknown as DocumentNode<DatasetBySlugQueryQuery, DatasetBySlugQueryQueryVariables>;