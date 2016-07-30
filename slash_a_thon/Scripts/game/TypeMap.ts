namespace Game {

    export class TypeMap {
        private typeMappings = {};

        setMapping(cellType: CellType, objectType: IGameObjectConstructor) {
            this.typeMappings[cellType as number] = objectType;
        }

        getMapping(cellType: CellType): IGameObjectConstructor {
            const index = cellType as number;
            if (index in this.typeMappings) {
                return this.typeMappings[index];
            }
            return undefined;
        }

        getObject(cellType: CellType): any {
            const mapping = this.getMapping(cellType);
            if (mapping !== undefined) {
                // ReSharper disable once InconsistentNaming
                return new mapping();
            }
            return undefined;
        }
    }
}