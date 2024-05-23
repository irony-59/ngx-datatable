if (typeof document !== 'undefined' && !document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
}
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */
export function elementsFromPoint(x, y) {
    const elements = [];
    const previousPointerEvents = [];
    let current; // TODO: window.getComputedStyle should be used with inferred type (Element)
    let i;
    let d;
    //if (document === undefined) return elements;
    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }
    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; (d = previousPointerEvents[--i]);) {
        elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
    }
    // return our results
    return elements;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxtLWZyb20tcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvdXRpbHMvZWxtLWZyb20tcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7SUFDbEUsUUFBUSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0NBQ2hEO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLENBQVMsRUFBRSxDQUFTO0lBQ3BELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixNQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztJQUNqQyxJQUFJLE9BQVksQ0FBQyxDQUFDLDRFQUE0RTtJQUM5RixJQUFJLENBQUMsQ0FBQztJQUNOLElBQUksQ0FBQyxDQUFDO0lBRU4sOENBQThDO0lBRTlDLG1GQUFtRjtJQUNuRixPQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDekcseUNBQXlDO1FBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIscUJBQXFCLENBQUMsSUFBSSxDQUFDO1lBQ3pCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO1lBQ3ZELFFBQVEsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1NBQzlELENBQUMsQ0FBQztRQUVILCtEQUErRDtRQUMvRCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDbEU7SUFFRCw2Q0FBNkM7SUFDN0MsS0FBSyxDQUFDLEdBQUcscUJBQXFCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRztRQUN4RSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3JGO0lBRUQscUJBQXFCO0lBQ3JCLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQpIHtcbiAgZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQgPSBlbGVtZW50c0Zyb21Qb2ludDtcbn1cblxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgYGVsZW1lbnRzRnJvbVBvaW50YFxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9lbGVtZW50c0Zyb21Qb2ludFxuICogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vaWRkYW4vNTRkNWQ5ZTU4MzExYjA0OTVhOTFiZjA2ZGU2NjEzODBcbiAqIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL29zbGVnby83MjY1NDEyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50c0Zyb21Qb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICBjb25zdCBlbGVtZW50cyA9IFtdO1xuICBjb25zdCBwcmV2aW91c1BvaW50ZXJFdmVudHMgPSBbXTtcbiAgbGV0IGN1cnJlbnQ6IGFueTsgLy8gVE9ETzogd2luZG93LmdldENvbXB1dGVkU3R5bGUgc2hvdWxkIGJlIHVzZWQgd2l0aCBpbmZlcnJlZCB0eXBlIChFbGVtZW50KVxuICBsZXQgaTtcbiAgbGV0IGQ7XG5cbiAgLy9pZiAoZG9jdW1lbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGVsZW1lbnRzO1xuXG4gIC8vIGdldCBhbGwgZWxlbWVudHMgdmlhIGVsZW1lbnRGcm9tUG9pbnQsIGFuZCByZW1vdmUgdGhlbSBmcm9tIGhpdC10ZXN0aW5nIGluIG9yZGVyXG4gIHdoaWxlICgoY3VycmVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSkpICYmIGVsZW1lbnRzLmluZGV4T2YoY3VycmVudCkgPT09IC0xICYmIGN1cnJlbnQgIT0gbnVsbCkge1xuICAgIC8vIHB1c2ggdGhlIGVsZW1lbnQgYW5kIGl0cyBjdXJyZW50IHN0eWxlXG4gICAgZWxlbWVudHMucHVzaChjdXJyZW50KTtcbiAgICBwcmV2aW91c1BvaW50ZXJFdmVudHMucHVzaCh7XG4gICAgICB2YWx1ZTogY3VycmVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwb2ludGVyLWV2ZW50cycpLFxuICAgICAgcHJpb3JpdHk6IGN1cnJlbnQuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eSgncG9pbnRlci1ldmVudHMnKVxuICAgIH0pO1xuXG4gICAgLy8gYWRkIFwicG9pbnRlci1ldmVudHM6IG5vbmVcIiwgdG8gZ2V0IHRvIHRoZSB1bmRlcmx5aW5nIGVsZW1lbnRcbiAgICBjdXJyZW50LnN0eWxlLnNldFByb3BlcnR5KCdwb2ludGVyLWV2ZW50cycsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICB9XG5cbiAgLy8gcmVzdG9yZSB0aGUgcHJldmlvdXMgcG9pbnRlci1ldmVudHMgdmFsdWVzXG4gIGZvciAoaSA9IHByZXZpb3VzUG9pbnRlckV2ZW50cy5sZW5ndGg7IChkID0gcHJldmlvdXNQb2ludGVyRXZlbnRzWy0taV0pOykge1xuICAgIGVsZW1lbnRzW2ldLnN0eWxlLnNldFByb3BlcnR5KCdwb2ludGVyLWV2ZW50cycsIGQudmFsdWUgPyBkLnZhbHVlIDogJycsIGQucHJpb3JpdHkpO1xuICB9XG5cbiAgLy8gcmV0dXJuIG91ciByZXN1bHRzXG4gIHJldHVybiBlbGVtZW50cztcbn1cbiJdfQ==