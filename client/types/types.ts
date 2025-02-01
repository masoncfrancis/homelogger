export interface Receipt {
    id: number;
    file: File;
    associatedId: number;
    type: 'maintenance' | 'repair';
}
