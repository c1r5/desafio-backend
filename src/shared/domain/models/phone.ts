import FieldValidationInterface from "@/shared/domain/models/field-validation-interface";

export default class Phone implements FieldValidationInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'phone'
    ) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}