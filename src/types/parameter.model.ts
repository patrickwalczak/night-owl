import { CategoryParameter } from './db.models';

export interface ParameterModelType {
	id: string;
	name: string;
	description?: string | null;
	createdAt: Date;
	updatedAt: Date;

	categories?: CategoryParameter[];
	values?: ParameterValueModelType[];
}

export type FilterParameterType = Pick<ParameterModelType, 'id' | 'name'> & { values: FilterParameterValueType[] };

export interface ParameterValueModelType {
	id: string;
	value: string;
	count: number;

	parameterId: string;
	parameter?: ParameterModelType;

	products?: ProductParameterValueModelType[];
}

export type FilterParameterValueType = Pick<ParameterValueModelType, 'id' | 'value' | 'count'>;

export interface ProductParameterValueModelType {
	id: string;
	productId: string;
	parameterValueId: string;

	product?: ParameterModelType;
	parameterValue?: ParameterValueModelType;
}
