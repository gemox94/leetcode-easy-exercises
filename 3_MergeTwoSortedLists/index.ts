// Merge two sorted linked lists and return it as a new sorted list.
// The new list should be made by splicing together the nodes of the first two lists.

// CONSTRAINTS:
// - The number of nodes in both lists is in the range [0, 50].
// - -100 <= Node.val <= 100
// - Both l1 and l2 are sorted in non-decreasing order.

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next; 
    }
}

const l1: ListNode = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2: ListNode = new ListNode(2, new ListNode(3));

const getListNodeValues = (list: ListNode | null, container: number[] = []): number[] => {
    if (list === null) {
        return container;
    } else {
        container.push(list.val);
        return getListNodeValues(list.next, container);
    }
}

const generateListNodeFromArray = (values: number[], list: ListNode | null = null) => {

    const value = values.pop();
    if (value === undefined) {
        return list;
    } else {
        const newList: ListNode = new ListNode(value, list);
        return generateListNodeFromArray(values, newList);
    }

};

function mergeTwoList(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    const valuesList1: number[] = getListNodeValues(l1);
    const valuesList2: number[] = getListNodeValues(l2);
    
    const filteredList1: number[] = valuesList1.length <= 50 ?
        valuesList1.filter(val => val >= -100 && val <= 100).sort((a: number, b: number) => a - b) :
        [];
    const filteredList2: number[] = valuesList2.length <= 50 ?
        valuesList2.filter(val => val >= -100 && val <= 100).sort((a: number, b: number) => a - b) :
        [];

    const finalList = [...filteredList1 , ...filteredList2].sort((a: number, b: number) => a - b);

    return generateListNodeFromArray(finalList);
};

const finalListNode = mergeTwoList(l1, l2);

console.log(
    getListNodeValues(finalListNode)
);
