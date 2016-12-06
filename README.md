# Oodles
There's oodles of things that need be ordered, and I ain't got no willpower to do it with Google Docs.

## Models
### Oodler
A person who handles an office's stockpiles.

Has a `firstName`, `lastName`, `email`, `office` and a `scope`

### Thingy
An orderable item, or an item from the stockpiles

Has a `name`, `unit`, and a `pictureUrl`

### Oodlet
A fancy name for an order (this is order from user to admin)

Has a `dueDate`, `orderedAt` date, `oodler`, `quantifiedThingies [{...}, {...}, ...]` (thingy with quantity)

### Total Oodlet
A total admin's order that is sum of user orders

Has a `date`, `orderedAt` date, `oodler`, `quantifiedThingies [{...}, {...}, ...]`(thingy with quantity), `oodletIds` (ids of all orders consisted in total order)


