**xcite** - a small yet flexible javascript templating engine.

<font size="-1">The purpose for **xcite** is simple, I had been looking for a decent templating engine for a while and tried others.  I really liked **Vue**.  It is quite nice and flexible.  But there are a few things that let me to continue looking.  One is the size.  I wanted something small.  Also, I had no need for data binding.  I admit this is pretty neat in **Vue**  and works really well.  Also, I didn't want data object properties replaced with **Observables**.  I understand the need, but still didn't want them.  I also tried **dot** which almost met my needs, but I wanted sub-templates and they didn't work the way I wanted.</font>


**xcite** provides three functions

```javacript
import { xcite_template, xcite_run, xcite_get } from 'xcite';
```

```javascript
let data = {
    personal: {
        name: 'John Jones',
        address: '123 Abc Street',
        phone: '800.555.1212'
    }, 
    list: [
        { name: 'James', age: 24, hair_color: 'brown' },
        { name: 'Lee', age: 56, hair_color: 'gray' },
        { name: 'Elizabeth', age: 55, hair_color: 'blond' },
    ] 
};
```

**xcite_template** accepts a template string and an optional name and returns a template function.  If given a name then the template can be retrieved by name using **xcite_get** or referenced in another template as a sub-template.

The first template will show **data.personal**

`let t1 = xcite_template( '{{ x.name }}', 't1' );`

you can run this template two ways:

`let html = t1( data );`
or
`let html = xcite_get('t1')( data );`

**xcite** understand three template tags: `{{ }}` `{{+ }}` and `{{% }}`

**xcite** internally builds a string ( **o** ) that the template function will return.  The first template tag `{{ }}` will build **o** for you and the second `{{+ }}` allows you to build it yourself.

Note: data that is passed into the template or passed to a sub-template is referenced using the **x** variable.  Other data that is generated or defined inside the template is referenced as is.

So, the above template **t1** uses `{{ }}`, so it will build **o** for you.  To produce the same output with `{{+ }}`, you could change the template to:

`let t1 = xcite_template( '{{+ o+=x.name }}', 't1' );`

Both templates will output:

`John Jones`

Now let's render **data.list** in an html table.

```javascript
let t2 = xcite_template(`
    <table style="width:40%;">
        {{+ x.list.forEach( (item, i ) => { }}
            <tr>
                <td>{{i}}</td>
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
                <td>{{item.hair_color}}</td>
            </tr>
        {{+ }) }} 
    </table>
`);
```

now run the template with

`let html = t2( data );`

Note: when you build templates like this, don't forget to close any open parens or braces. e.g. `{{+ }) }}`  

An example of where you can use a sub template would be to pull out the **&lt;tr>** block and make it it's own template.

```javascript
xcite_template(`
    <tr>
        <td>{{ x[1] }}</td>
        <td>{{ x[0].name }}</td>
        <td>{{ x[0].age }}</td>
        <td>{{ x[0].hair_color }}</td>
    </tr>
`, 'sub1');

let t3 = xcite_template(`
    <table style="width:40%;">
        {{+ x.list.forEach( (item, i ) => { }}
          {{% sub1 [item,i] }}
        {{+ }) }} 
    </table>
`)
```

Note: notice that the sub template (**sub1**) is passed an array because it needs the **item** and the **index** (**i**).  Also, noticed that **sub1** references these using **x**.

if you need to **pass** multiple values and do not want to use an array, you can pass a plain object instead. 

```javascript
xcite_template(`
    <tr>
        <td>{{ x.index }}</td>
        <td>{{ x.item.name }}</td>
        <td>{{ x.item.age }}</td>
        <td>{{ x.item.hair_color }}</td>
    </tr>
`, 'sub2');

let t4 = xcite_template(`
    <table style="width:40%;">
        {{+ x.list.forEach( (item, i ) => { }}
            {{% sub2 {item,index:i} }}
        {{+ }) }} 
    </table>
`)
```

or if you do not need the index

```javascript
xcite_template(`
    <tr>
        <td>{{ x.name }}</td>
        <td>{{ x.age }}</td>
        <td>{{ x.hair_color }}</td>
    </tr>
`, 'sub3');

let t4 = xcite_template(`
    <table style="width:40%;">
        {{+ x.list.forEach( (item, i ) => { }}
            {{% sub3 item }}
        {{+ }) }} 
    </table>
`)
```
These are simple examples and hopefully you can see how to expand the use of `{{+ }}` for more complex templates if needed.

Have fun and please leave any comments or suggestions as in the issues page on github.