/**
 *  Next step would b to be implement a min binary headp
 *  Ass we freeze rows, we want to add it to a binary heap
 *  - since we can freeze in any order
 *  -- we need to correct the offset
 *      Eg
 *          Row 1: Frooze
 *          Row 2: Frooze + 100px offset
 *          Row 3: frooze + 200px offset
 *
 *          Row 1: frooze + 0px
 *          Row 3: frooze + 100px offset
 *
 *          if we then freeze Row 200
 *          Row 1: frooze + 0px
 *          Row 3: frooze + 100px offset
 *          Row 2: frozoe + 200px offset
 *              - algro must take notice of row value, update offest correctly
 *              - then update remaining offset
 *
 * binary heap would be use ful
 *  - use minHeap data structure because the smallest nodes do not nedd to change as much
 *  - add new node, traverse tree, and inset into proper position, and reculate the post
 * https://eloquentjavascript.net/1st_edition/appendix2.html
 */