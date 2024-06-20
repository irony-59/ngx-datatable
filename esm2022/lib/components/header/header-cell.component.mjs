import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DataTableHeaderCellComponent {
    set allRowsSelected(value) {
        this._allRowsSelected = value;
        this.cellContext.allRowsSelected = value;
    }
    get allRowsSelected() {
        return this._allRowsSelected;
    }
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.cd.markForCheck();
    }
    get column() {
        return this._column;
    }
    set sorts(val) {
        this._sorts = val;
        this.sortDir = this.calcSortDir(val);
        this.cellContext.sortDir = this.sortDir;
        this.sortClass = this.calcSortClass(this.sortDir);
        this.cd.markForCheck();
    }
    get sorts() {
        return this._sorts;
    }
    get columnCssClasses() {
        let cls = 'datatable-header-cell';
        if (this.column.sortable) {
            cls += ' sortable';
        }
        if (this.column.resizeable) {
            cls += ' resizeable';
        }
        if (this.column.headerClass) {
            if (typeof this.column.headerClass === 'string') {
                cls += ' ' + this.column.headerClass;
            }
            else if (typeof this.column.headerClass === 'function') {
                const res = this.column.headerClass({
                    column: this.column
                });
                if (typeof res === 'string') {
                    cls += res;
                }
                else if (typeof res === 'object') {
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true) {
                            cls += ` ${k}`;
                        }
                    }
                }
            }
        }
        const sortDir = this.sortDir;
        if (sortDir) {
            cls += ` sort-active sort-${sortDir}`;
        }
        return cls;
    }
    get name() {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.headerTemplate === undefined ? this.column.name : undefined;
    }
    get minWidth() {
        return this.column.minWidth;
    }
    get maxWidth() {
        return this.column.maxWidth;
    }
    get width() {
        return this.column.width;
    }
    get tabindex() {
        return this.column.sortable ? 0 : -1;
    }
    get isCheckboxable() {
        return this.column.headerCheckboxable;
    }
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    onContextmenu($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    }
    enter() {
        this.onSort();
    }
    ngOnInit() {
        this.sortClass = this.calcSortClass(this.sortDir);
    }
    calcSortDir(sorts) {
        if (sorts && this.column) {
            const sort = sorts.find((s) => s.prop === this.column.prop);
            if (sort) {
                return sort.dir;
            }
        }
    }
    onSort() {
        if (!this.column.sortable) {
            return;
        }
        const newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue
        });
    }
    calcSortClass(sortDir) {
        if (!this.cellContext.column.sortable) {
            return;
        }
        if (sortDir === SortDirection.asc) {
            return `sort-btn sort-asc ${this.sortAscendingIcon}`;
        }
        else if (sortDir === SortDirection.desc) {
            return `sort-btn sort-desc ${this.sortDescendingIcon}`;
        }
        else {
            return `sort-btn ${this.sortUnsetIcon}`;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: DataTableHeaderCellComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.6", type: DataTableHeaderCellComponent, selector: "datatable-header-cell", inputs: { sortType: "sortType", sortAscendingIcon: "sortAscendingIcon", sortDescendingIcon: "sortDescendingIcon", sortUnsetIcon: "sortUnsetIcon", isTarget: "isTarget", targetMarkerTemplate: "targetMarkerTemplate", targetMarkerContext: "targetMarkerContext", allRowsSelected: "allRowsSelected", selectionType: "selectionType", column: "column", headerHeight: "headerHeight", sorts: "sorts" }, outputs: { sort: "sort", select: "select", columnContextmenu: "columnContextmenu" }, host: { listeners: { "contextmenu": "onContextmenu($event)", "keydown.enter": "enter()" }, properties: { "style.height.px": "this.headerHeight", "class": "this.columnCssClasses", "attr.title": "this.name", "style.minWidth.px": "this.minWidth", "style.maxWidth.px": "this.maxWidth", "style.width.px": "this.width", "tabindex": "this.tabindex" }, classAttribute: "datatable-header-cell" }, ngImport: i0, template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      <label *ngIf="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
      </label>
      <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: DataTableHeaderCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-header-cell',
                    template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      <label *ngIf="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
      </label>
      <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `,
                    host: {
                        class: 'datatable-header-cell'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { sortType: [{
                type: Input
            }], sortAscendingIcon: [{
                type: Input
            }], sortDescendingIcon: [{
                type: Input
            }], sortUnsetIcon: [{
                type: Input
            }], isTarget: [{
                type: Input
            }], targetMarkerTemplate: [{
                type: Input
            }], targetMarkerContext: [{
                type: Input
            }], allRowsSelected: [{
                type: Input
            }], selectionType: [{
                type: Input
            }], column: [{
                type: Input
            }], headerHeight: [{
                type: HostBinding,
                args: ['style.height.px']
            }, {
                type: Input
            }], sorts: [{
                type: Input
            }], sort: [{
                type: Output
            }], select: [{
                type: Output
            }], columnContextmenu: [{
                type: Output
            }], columnCssClasses: [{
                type: HostBinding,
                args: ['class']
            }], name: [{
                type: HostBinding,
                args: ['attr.title']
            }], minWidth: [{
                type: HostBinding,
                args: ['style.minWidth.px']
            }], maxWidth: [{
                type: HostBinding,
                args: ['style.maxWidth.px']
            }], width: [{
                type: HostBinding,
                args: ['style.width.px']
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }], onContextmenu: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }], enter: [{
                type: HostListener,
                args: ['keydown.enter']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7OztBQWdDaEUsTUFBTSxPQUFPLDRCQUE0QjtJQVl2QyxJQUFhLGVBQWUsQ0FBQyxLQUFLO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzNDLENBQUM7SUFDRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUlELElBQWEsTUFBTSxDQUFDLE1BQW1CO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQU1ELElBQWEsS0FBSyxDQUFDLEdBQVU7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMs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QkFBdUI7cUJBQy9CO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtzRkFFVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBSU8sZUFBZTtzQkFBM0IsS0FBSztnQkFRRyxhQUFhO3NCQUFyQixLQUFLO2dCQUVPLE1BQU07c0JBQWxCLEtBQUs7Z0JBWUosWUFBWTtzQkFGYixXQUFXO3VCQUFDLGlCQUFpQjs7c0JBQzdCLEtBQUs7Z0JBR08sS0FBSztzQkFBakIsS0FBSztnQkFZSSxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFHSCxnQkFBZ0I7c0JBRG5CLFdBQVc7dUJBQUMsT0FBTztnQkFrQ2hCLElBQUk7c0JBRFAsV0FBVzt1QkFBQyxZQUFZO2dCQU9yQixRQUFRO3NCQURYLFdBQVc7dUJBQUMsbUJBQW1CO2dCQU01QixRQUFRO3NCQURYLFdBQVc7dUJBQUMsbUJBQW1CO2dCQU01QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUtBLFFBQVE7c0JBQXBDLFdBQVc7dUJBQUMsVUFBVTtnQkE2QnZCLGFBQWE7c0JBRFosWUFBWTt1QkFBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTXZDLEtBQUs7c0JBREosWUFBWTt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgbmV4dFNvcnREaXIgfSBmcm9tICcuLi8uLi91dGlscy9zb3J0JztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXRlbXBsYXRlLXdyYXBcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAqbmdJZj1cImlzVGFyZ2V0XCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwidGFyZ2V0TWFya2VyQ29udGV4dFwiXG4gICAgICA+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPGxhYmVsICpuZ0lmPVwiaXNDaGVja2JveGFibGVcIiBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiYWxsUm93c1NlbGVjdGVkXCIgKGNoYW5nZSk9XCJzZWxlY3QuZW1pdCghYWxsUm93c1NlbGVjdGVkKVwiIC8+XG4gICAgICA8L2xhYmVsPlxuICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmhlYWRlclRlbXBsYXRlXCIgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtd3JhcHBlclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbCBkcmFnZ2FibGVcIiAoY2xpY2spPVwib25Tb3J0KClcIiBbaW5uZXJIVE1MXT1cIm5hbWVcIj4gPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNlbGxDb250ZXh0XCJcbiAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8c3BhbiAoY2xpY2spPVwib25Tb3J0KClcIiBbY2xhc3NdPVwic29ydENsYXNzXCI+IDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlO1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IHN0cmluZztcbiAgQElucHV0KCkgc29ydFVuc2V0SWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGlzVGFyZ2V0OiBib29sZWFuO1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XG5cbiAgX2FsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBzZXQgYWxsUm93c1NlbGVjdGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fYWxsUm93c1NlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5hbGxSb3dzU2VsZWN0ZWQgPSB2YWx1ZTtcbiAgfVxuICBnZXQgYWxsUm93c1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGxSb3dzU2VsZWN0ZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW4oY29sdW1uOiBUYWJsZUNvbHVtbikge1xuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgQElucHV0KClcbiAgICBoZWFkZXJIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKSBzZXQgc29ydHModmFsOiBhbnlbXSkge1xuICAgIHRoaXMuX3NvcnRzID0gdmFsO1xuICAgIHRoaXMuc29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcbiAgICB0aGlzLmNlbGxDb250ZXh0LnNvcnREaXIgPSB0aGlzLnNvcnREaXI7XG4gICAgdGhpcy5zb3J0Q2xhc3MgPSB0aGlzLmNhbGNTb3J0Q2xhc3ModGhpcy5zb3J0RGlyKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHNvcnRzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XG4gIH1cblxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sdW1uQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IGNvbHVtbjogYW55IH0+KGZhbHNlKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNvbHVtbkNzc0NsYXNzZXMoKTogYW55IHtcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCc7XG5cbiAgICBpZiAodGhpcy5jb2x1bW4uc29ydGFibGUpIHtjbHMgKz0gJyBzb3J0YWJsZSc7fVxuICAgIGlmICh0aGlzLmNvbHVtbi5yZXNpemVhYmxlKSB7Y2xzICs9ICcgcmVzaXplYWJsZSc7fVxuICAgIGlmICh0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3Moe1xuICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY2xzICs9IHJlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xuICAgICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSB7Y2xzICs9IGAgJHtrfWA7fVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNvcnREaXIgPSB0aGlzLnNvcnREaXI7XG4gICAgaWYgKHNvcnREaXIpIHtcbiAgICAgIGNscyArPSBgIHNvcnQtYWN0aXZlIHNvcnQtJHtzb3J0RGlyfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNscztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci50aXRsZScpXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gZ3VhcmFudGVlZCB0byBoYXZlIGEgdmFsdWUgYnkgc2V0Q29sdW1uRGVmYXVsdHMoKSBpbiBjb2x1bW4taGVscGVyLnRzXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLmhlYWRlclRlbXBsYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLmNvbHVtbi5uYW1lIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW5XaWR0aC5weCcpXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5taW5XaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWF4V2lkdGgucHgnKVxuICBnZXQgbWF4V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWF4V2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLndpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIGdldCB0YWJpbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5zb3J0YWJsZSA/IDAgOiAtMTtcbiAgfSBcblxuICBnZXQgaXNDaGVja2JveGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLmhlYWRlckNoZWNrYm94YWJsZTtcbiAgfVxuXG4gIHNvcnRGbiA9IHRoaXMub25Tb3J0LmJpbmQodGhpcyk7XG4gIHNvcnRDbGFzczogc3RyaW5nO1xuICBzb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xuICBzZWxlY3RGbiA9IHRoaXMuc2VsZWN0LmVtaXQuYmluZCh0aGlzLnNlbGVjdCk7XG5cbiAgY2VsbENvbnRleHQ6IGFueTtcblxuICBwcml2YXRlIF9jb2x1bW46IFRhYmxlQ29sdW1uO1xuICBwcml2YXRlIF9zb3J0czogYW55W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmNlbGxDb250ZXh0ID0ge1xuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICAgIHNvcnREaXI6IHRoaXMuc29ydERpcixcbiAgICAgIHNvcnRGbjogdGhpcy5zb3J0Rm4sXG4gICAgICBhbGxSb3dzU2VsZWN0ZWQ6IHRoaXMuYWxsUm93c1NlbGVjdGVkLFxuICAgICAgc2VsZWN0Rm46IHRoaXMuc2VsZWN0Rm5cbiAgICB9O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxuICBvbkNvbnRleHRtZW51KCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uQ29udGV4dG1lbnUuZW1pdCh7IGV2ZW50OiAkZXZlbnQsIGNvbHVtbjogdGhpcy5jb2x1bW4gfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJylcbiAgZW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5vblNvcnQoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc29ydENsYXNzID0gdGhpcy5jYWxjU29ydENsYXNzKHRoaXMuc29ydERpcik7XG4gIH1cblxuICBjYWxjU29ydERpcihzb3J0czogYW55W10pOiBhbnkge1xuICAgIGlmIChzb3J0cyAmJiB0aGlzLmNvbHVtbikge1xuICAgICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4gcy5wcm9wID09PSB0aGlzLmNvbHVtbi5wcm9wKTtcblxuICAgICAgaWYgKHNvcnQpIHtyZXR1cm4gc29ydC5kaXI7fVxuICAgIH1cbiAgfVxuXG4gIG9uU29ydCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uLnNvcnRhYmxlKSB7cmV0dXJuO31cblxuICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV4dFNvcnREaXIodGhpcy5zb3J0VHlwZSwgdGhpcy5zb3J0RGlyKTtcbiAgICB0aGlzLnNvcnQuZW1pdCh7XG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxuICAgICAgcHJldlZhbHVlOiB0aGlzLnNvcnREaXIsXG4gICAgICBuZXdWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgY2FsY1NvcnRDbGFzcyhzb3J0RGlyOiBTb3J0RGlyZWN0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuY2VsbENvbnRleHQuY29sdW1uLnNvcnRhYmxlKSB7cmV0dXJuO31cbiAgICBpZiAoc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1hc2MgJHt0aGlzLnNvcnRBc2NlbmRpbmdJY29ufWA7XG4gICAgfSBlbHNlIGlmIChzb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmRlc2MpIHtcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1kZXNjICR7dGhpcy5zb3J0RGVzY2VuZGluZ0ljb259YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0biAke3RoaXMuc29ydFVuc2V0SWNvbn1gO1xuICAgIH1cbiAgfVxufVxuIl19
