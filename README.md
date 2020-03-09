<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>xcite examples</title>

</head>

<style>
    pre {
        background: #f0f0f0;
        padding: 10px;
    }

    .out {
        background: beige;
        padding: 10px;
    }
</style>

<body>
    <script>
        let exports = {};
    </script>
    <script src=" ./lib/xcite.js"></script>

    <h2>xcite examples</h2>

    <hr><br>

    for the examples below we'll be using the following data object.<br>

    <pre><code>
let data = {
    personal: {
        name: 'Visitor',
        address: '123 Abc Street',
        phone: '800.555.1212'
    }, 
    list: [
        { name: 'James', age: 24, hair_color: 'brown' },
        { name: 'Lee', age: 56, hair_color: 'gray' },
        { name: 'Elizabeth', age: 55, hair_color: 'blond' },
    ], 
    colors: [
        'red', 'green', 'blue', 'orange'
    ]
};
    </code></pre>

    <br>
    The first template will show <strong>data.personal</strong>:

    <br>
    <pre><code id='code1'></code></pre>
    <div id='t1' class='out'></div>

    <br>
    <br>
    Next let's show <strong>data.list</strong> in a table a couple different ways:
    <br>

    <pre><code id='code2'></code></pre>
    <div id='t2' class='out'></div>

    <br>
    now the same list again but using a sub-template and passing an array to the sub-template

    <pre><code id='code3'></code></pre>
    <div id='t3' class='out'></div>

    <br><br><span style="color:red;font-size:1.5em">More examples coming</span>

    <script>

        let element = p_element => document.querySelector(p_element);

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
            ],
            colors: [
                'red', 'green', 'blue', 'orange'
            ]
        };

        let t1 = xcite_template(`
            Name: {{x.personal.name}}<br>
            Address: {{x.personal.address}}<br>
            Phone: {{x.personal.phone}}`);

        let code1 = `
let t1 = xcite_template(\`
Name: {{ x.personal.name }}<br>
Address: {{ x.personal.address }}<br>
Phone: {{ x.personal.phone }}\`);

let html = t1(data);
`;

        element('#code1').innerHTML = code1.replace(/</g, '&lt;');
        element('#t1').innerHTML = t1(data);

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

        let code2 = `let t2 = xcite_template(\`
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

    let html = t2(data);
\`);

`;

        element('#t2').innerHTML = t2(data);
        element('#code2').innerHTML = code2.replace(/</g, '&lt;');

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
            `);

        let code3 = `
xcite_template(\`
    <tr>
        <td>{{ x[1] }}</td>
        <td>{{ x[0].name }}</td>
        <td>{{ x[0].age }}</td>
        <td>{{ x[0].hair_color }}</td>
    </tr>\`, \'sub1\');

let t3 = xcite_template(\`
    <table style = "width:40%;" >
        {{+ x.list.forEach((item, i) => { }}
            {{% sub1 [item, i] }}
        {{+ }) }} 
    </table >
\`);`;

        element('#t3').innerHTML = t3(data);
        element('#code3').innerHTML = code3.replace(/</g, '&lt;');

    </script>
</body>

</html>