# CRUD Prisma

## Create (Membuat Data)

___

```javascript
const EXAMPLE = await prisma.<NAMA-TABLE>.create({
    data: {
    <NAMA-FIELD>: <VALUE>,
    <NAMA-FIELD>: <VALUE>,
    <NAMA-FIELD>: <VALUE>,
}
    });
```
###

## Read (Membaca Data)
___
#### Mencari semua data yang ada di <NAMA-TABLE>
```javascript
const EXAMPLE = await prisma.<NAMA-TABLE>.findMany();
```
#### Memilih Kolom tertentu
```javascript
const user = await prisma.<NAMA-TABLE>.findUnique({
  where: { id: 1 },
  select: {
    id: true,
    name: true,
    email: true,
  }
});

```
#### Mencari menggunakan field yang UNIQUE
```javascript
const EXAMPLE = await prisma.
<NAMA-TABLE>.findUnique({
    where: {
    <NAMA-FIELD>: <VALUE>
}
    });
```
###

## Update (Mengubah Data)
```javascript
const EXAMPLE = await prisma.<NAMA-TABLE>.update({
    where: {
    id: 1,
},
    data: {
    <NAMA-FIELD>: <VALUE>,
}
    });
```
####


## Delete (Menghapus Data)
```javascript
const EXAMPLE = await prisma.<NAMA-TABLE>.delete({
    where: {
    id: 1,
}
    });
```
####




