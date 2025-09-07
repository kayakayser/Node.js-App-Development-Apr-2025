##### NodeJs Event Loop

>Bir node uygulaması için main thread çalıştığında arka planda bir **event/message loop** mekanizması bulunur. Bu mekanizma ile blokesiz (non-blocking) giriş/çıkış (input/output) işlemleri yapılabilmektedir. Bu durumda node uygulaması (aslında Javascript'in kendisi) tek bir thread olarak çalışır ve diğer asenkron işlemler event loop yardımıyla geçekleştirilir. Event loop ile Nodejs programcısı bir olaya ilişkin kodları bir callback olarak verir ve olay gerçekleştiğinde işletim sistemi ve node uygulaması yardımıyla ilgili callback fonksiyon çağrılır. Event loop node uygulaması çalışmaya başladığında yaratılır. Bu durumda bir node uygulamasında bir olay oluşması durumunda yapılacak işlemleri programcı yazar, callback olarak ve/veya yeni nesil yaklaşımda `Promise` kullanılarak asenkron bir biçimde olay gerçekleştiğinde ilgili kodlar çalıştırılır. 

##### Programın Komut Satırı Argümanları

>Program çalıştırılırken verilen yazılara **komut satırı argümanı (command line arguments)** denir. Komut satırı argümanlarının ilgili programa aktarılması işletim sistemi tarafından yapılır. Komut satırı argümanları whitespace karakter ile ayrılır. Eğer yazı bir whitespace karakter içeriyorsa işletim sistemine göre `'` veya `"` arasında yazılarak verilebilir. Şüphesiz sisteme göre bunlar dışında da yöntemler olabilmektedir.  Node'da komut satırı argümanları `process` nesnesinin `argv` dizi elemanı ile elde edilebilir. Komut satırı argümanı alan uygulamaların bazıları komut satırı argüman sayısını kontrol ederek, yanlış bir sayı durumunda programı sonlandırmayı tercih ederler. Bunun için `process` nesnesinin `exit` metodu kullanılabilir. Bu metot bir `çıkış kodu (exit code)` bilgisi alır. Çıkış kodu process sonlandıktan sonra process'in işletim sistemine ilettiği genel olarak bir tamsayı değeridir. Bazı özel uygulamalarda kullanımı söz konusu olsa da genel olarak değerin önemi yoktur. Bir convention olarak (bazen işletim sistemi de buna göre arka plan işlemleri yapabilir) sıfır başarı bir sonlanma, sıfır dışı bir değer ise başarısız bir sonlanmayı ifade eder. Bir zorunluluk olmasa tipik olarak başarısızlık durumunda exit metoduna `1(bir)` değeri geçilebilir. 

>Aşağıda komut satırı argümanının kullanımına ilişkin demo örneği inceleyiniz. Örnek `sample.js` dosyasında ise örnek çalıştırma şu şekilde yapılabilir:

```
node sample.js 10 20 30
```

```javascript
import {writeLine} from "./csd/util/console/console.js";  
  
const totalCallback = (r, v) => {  
    if (isNaN(v)) {  
        process.stderr.write("Invalid number\r\n")  
        process.exit(1)  
    }  
  
    return r + v  
}  
  
const main = () => {  
    if (process.argv.length === 2) {  
        process.stderr.write("Usage: node sample.js <number1> <number2> <number2> ...\r\n")  
        process.exit(1)  
    }  
  
    const total = process.argv  
        .filter((_, i) => i >= 2)  
        .map(arg => Number(arg))  
        .reduce(totalCallback)  
  
    writeLine(total)  
}  
  
main()
```

>Yukarıdaki örnek için geçersiz argümanların toplama dahil edilmemiş  versiyonu aşağıdaki gibidir

```javascript
import {writeLine} from "./csd/util/console/console.js";  
  
const mapToNumberCallback = str => {  
    let result = Number(str);  
  
    if (isNaN(result)) {  
        process.stderr.write(`Invalid number: ${str}\r\n`);  
        result = 0  
    }  
  
    return result  
}  
  
const main = () => {  
    if (process.argv.length === 2) {  
        process.stderr.write("Usage: node sample.js <number1> <number2> <number2> ...\r\n")  
        process.exit(1)  
    }  
  
    const total = process.argv  
        .filter((_, i) => i >= 2)  
        .map(mapToNumberCallback)  
        .reduce((r, v) => r + v)  
  
    writeLine(total)  
}  
  
main()
```

##### Dosya İşlemleri

>İkincil belleklerde (secondary memory) organize edilmiş alanlara **dosya (file)** denir. Dosyaların isimleri ve özellikleri (attribute) vardır.  Dosya işlemleri aslında işletim sistemi tarafından yapılır. İşletim sisteminin dosya işlemleri ile ilgili faaliyetlerinden oluşan  bölümüne **dosya sistemi (file system)** denir. 

>Bir dosyanın yerini belirten yazısal ifadeye **yol ifadesi (path)** denilmektedir. Windows'ta dizin (directory) geçişleri  `\` karakteri ile UNIX/Linux ve Mac OS X sistemlerinde `/` ile belirtilir. Windows sistemlerinde ayrıca bir de `sürücü (drive)` kavramı vardır. UNIX/Linux sistemlerinde ve Mac OS X sistemlerinde sürücü kavramı yoktur. Windows sistemlerinde her sürücünün ayrı bir kökü ve dizin ağacı (directory tree) vardır. Sürücünün kök dizini onun en dış dizinidir.  
  
>Yol ifadeleri **mutlak (absolute)** ve **göreli (relative)** olmak üzere ikiye ayrılmaktadır. Eğer sürücü ifadesinden sonraki (yol ifadesinde sürücü de belirtilmeyebilir) ilk karakter `\` veya `/` ise böyle yol ifadelerine mutlak, değilse göreli yol ifadeleri denilmektedir. Örneğin:  
  
>- `c:\a\b\c.dat  ---> mutlak yol ifadesi`
>- `\x\y\z.txt    ---> mutlak yol ifadesi`
>- `x\y\z.txt     ---> göreli`
>- `x.txt       ---> göreli`
>- `c:/a/b/c.dat  ---> mutlak yol ifadesi`
>-  `/x/y/z.txt"    ---> mutlak yol ifadesi`
>- `x/y/z.txt"     ---> göreli`
  
>Her process'in bir **çalışma dizini (current working directory)** vardır. Process'in çalışma dizini göreli yol ifadelerinin  çözülmesi (resolve) için orijin belirtir. Örneğin, process'imizin çalışma dizini (cwd) `c:\temp` olsun. Biz bu programda  `x\y\z.dat` biçiminde bir yol ifadesi kullanırsak toplamda `c:\temp\x\y\z.dat` dosyasını belirtmiş oluruz. Prosesin çalışma dizini istenildiği zaman değiştirilebilir. Ancak işin başında genel olarak programın çalıştırıldığı dizindir.  Örnek Windows işletim sistemi için anlatılmıştır. Benzer şekilde örneğin cwd `/tmp` dizini ise `x/y/z.dat` biçimindeki göreli yol ifadesi toplamda `/tmp/x/y/z.dat` biçiminde olacaktır.  
  
>Mutlak yol ifadeleri kök dizinden itibaren çözülür. Windows sistemlerine özgü olarak eğer yol ifadesinde sürücü belirtilmemişse prosesin çalışma dizininin bulunduğu sürücü o mutlak yol ifadesindeki sürücü olarak alınır. Örneğin prosesin çalışma dizini `d:\temp` olsun. `\a\b\c.dat` mutlak yol ifadesi d'nin kök dizininden itibaren yol belirtir yani örnekteki yol ifadesi `d:\a\b\c.dat` olarak ele alınır.

>Windows’ta dosya ve dizin isimlerinin büyük harf küçük harf duyarlılığı yoktur. Windows dosyanın ismini bizim belirttiğimiz gibi saklar. Ancak işleme sokarken büyük harf küçük harf farkını dikkate almaz. Ancak UNIX/Linux  sistemlerinde (Mac OS X dahil) dosya ve dizin isimlerinin büyük harf küçük harf duyarlılığı vardır.  
  
>Yol ifadelerinde kullanabileceğimiz iki özel dizin ismi vardır. Bunlar `.` ve `..` isimleridir. `.` o anda belirtilen dizinin aynısı, `..` ise o anda belirtilen dizinin üst dizini (parent directory) anlamına gelir. Örneğin `a\b\..\c.txt` yol ifadesi aslında `a\x.txt` ile eşdeğerdir.

>Process'in çalışma dizini `process` nesnesinin `cwd` isimli fonksiyon ile elde edilebilir. `chdir` fonksiyonu ile çalışma dizini değiştirilebilir. chdir fonksiyonu verilen çalışma dizini yoksa yoksa error fırlatır.

```javascript
import {writeLine} from "./csd/util/console/console.js";  
  
const main = () => {  
  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
    try {  
        writeLine(process.cwd())  
        process.chdir(process.argv[2])  
        writeLine(process.cwd())  
    }  
    catch (e) {  
        process.stderr.write(`Directory not exists:${process.argv[2]}\r\n`)  
    }  
}  
  
main()
```

>Nodejs'de yol ifadelerine ilişkin fonksiyonlar `path` standart modülünde bulunur. Bu modüle ilişkin fonksiyonların bazıları şunlardır. 

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import path from "path";  
  
const main = () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    const p = process.argv[2]  
  
    writeLine(path.isAbsolute(p) ? "Absolute" : "Relative")  
    writeLine(`Extension:${path.extname(p)}`);  
    writeLine(`Base name:${path.basename(p)}`);  
    writeLine(`Directory name:${path.dirname(p)}`);  
}  
  
main()
```

>Nodejs'de dosya işlemlerine ilişkin fonksiyonlar `fs` isimli standart modül veya bu modül altındaki modüller içerisinde bulunur. Nodejs'de dosya işlemlerine ilişkin bir fonksiyon iki farklı biçimde bulunur. Genellikle iki biçimde aynı isimdedir. Bir fonksiyonun `fs` modülündeki versiyonu callback alır, aynı fonksiyonun `fs/promises` modülü içerisindeki versiyonu `Promise` nesnesine geri döner. Bu durumda programcı arka planda iş için ya callback verir ya da aldığı `Promise` nesnesi ile arka planı yönetir. 

>Dosya işlemlerine ilişkin fonksiyonlar genel olarak iki gruba ayrılabilir:
>- Dosyanın bütünü ile ilgili işlemler yapan fonksiyonlar. Örneğin, silme, dosya hakkında bilgi edinme vb.
>- Dosyanının verileri ile işlem yapan fonksiyonlar: Örneğin, okuma, yazma.

**Anahtar Notlar:** Her ne kadar amaçları ve kullanımları farklı olsa da bir `dizin (directory)` ve `normal dosya (regular file)` işletim sistemi açısından birer dosyadır (file). Normal dosya içerisinde veriler tutulurken, dizin içerisinde diğer dosyalar ve dizinlerin bilgileri tutulur. 

**Anahtar Notlar:** Dosya sistemine ilişkin callback alan fonksiyonların, callback'lerinin birinci parametresi genel olarak error oluştuğunda yaratılan nesneye ilişkin referanstır. 

>`fs` modülündeki `stat` fonksiyonu parametre olarak yol ifadesi ve bir callback alır. Bu callback'in ikinci parametresi `fs.Stats` türünden bir referanstır. Bu referansa ilişkin nesnenin içerisinde dosyaya ilişkin bilgiler bulunur. `fs.Stats` nesnesinin `isXXX` metotları ile ilgili bilgiler elde edilebilir. Bu bilgilerin bazıları çeşitli işletim sistemlerine özgüdür.

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import fs from "fs";  
  
const main = () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    fs.stat(process.argv[2], (e, s) => {  
        if (e) {  
            process.stderr.write(`Problem occurred:${e}`)  
            return  
        }  
  
        if (s.isFile())  
            writeLine(`Regular file -> Size:${s.size}`);  
        else if (s.isDirectory())  
            writeLine("Directory");  
        else if (s.isFIFO())  
            writeLine("Fifo");  
        else if (s.isSymbolicLink())  
            writeLine("SymbolicLink");  
        else if (s.isSocket())  
            writeLine("Socket");  
        else if (s.isCharacterDevice())  
            writeLine("Character Device");  
        else if (s.isBlockDevice())  
            writeLine("Block Device");  
        else  
            writeLine("Other")  
    })  
  
}  
  
main()
```

>Yukarıdaki örnek `CommonJS` kullanılarak aşağıdaki gibi de yapılabilir

```javascript
const {writeLine} = require("./csd/util/console/console.js")  
const fs= require("fs")  
  
const main = () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    fs.stat(process.argv[2], (e, s) => {  
        if (e) {  
            process.stderr.write(`Problem occurred:${e}`)  
            return  
        }  
  
        if (s.isFile())  
            writeLine(`Regular file -> Size:${s.size}`);  
        else if (s.isDirectory())  
            writeLine("Directory");  
        else if (s.isFIFO())  
            writeLine("Fifo");  
        else if (s.isSymbolicLink())  
            writeLine("SymbolicLink");  
        else if (s.isSocket())  
            writeLine("Socket");  
        else if (s.isCharacterDevice())  
            writeLine("Character Device");  
        else if (s.isBlockDevice())  
            writeLine("Block Device");  
        else  
            writeLine("Other")  
    })  
}  
  
main()
```


>Yukarıdaki örnek `fs/promises` modülündeki `stat` fonksiyonu aşağıdaki biçimde yapılabilir

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
  
const showInfo = (s) => {  
    if (s.isFile())  
        writeLine(`Regular file -> Size:${s.size}`);  
    else if (s.isDirectory())  
        writeLine("Directory");  
    else if (s.isFIFO())  
        writeLine("Fifo");  
    else if (s.isSymbolicLink())  
        writeLine("SymbolicLink");  
    else if (s.isSocket())  
        writeLine("Socket");  
    else if (s.isCharacterDevice())  
        writeLine("Character Device");  
    else if (s.isBlockDevice())  
        writeLine("Block Device");  
    else  
        writeLine("Other")  
}  
  
const main = () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    fsp.stat(process.argv[2]).then(showInfo).catch(e => process.stderr.write(`Problem occurred:${e}`))  
}  
  
main()
```

>Yukarıdaki örnek `await`operatörü ile aşağıdaki gibi yapılabilir

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
  
const showInfo = (s) => {  
    if (s.isFile())  
        writeLine(`Regular file -> Size:${s.size}`);  
    else if (s.isDirectory())  
        writeLine("Directory");  
    else if (s.isFIFO())  
        writeLine("Fifo");  
    else if (s.isSymbolicLink())  
        writeLine("SymbolicLink");  
    else if (s.isSocket())  
        writeLine("Socket");  
    else if (s.isCharacterDevice())  
        writeLine("Character Device");  
    else if (s.isBlockDevice())  
        writeLine("Block Device");  
    else  
        writeLine("Other")  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        const s = await fsp.stat(process.argv[2])  
  
        showInfo(s)  
    }  
    catch (e) {  
        process.stderr.write(`Problem occurred:${e}\r\n`)  
    }  
}  
  
main()
```

>`mkdir`fonksiyonu ile dizin yaratılabilir. Fonksiyonun options parametresi ileride ele alınacaktır.

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.mkdir(process.argv[2])  
    }  
    catch (e) {  
        process.stderr.write(`Problem occurred:${e}\r\n`)  
    }  
}  
  
main()
```

>Bir dosyanın (ya da dosya olarak ele alınabilen kavramların) var olup olmadığı bilgisi `access` isimli bir fonksiyon kullanılarak elde edilebilir. access fonksiyonu erişilebilirlik anlamında sadece dosyanın var olup olmadığı durumunda kullanılmaz. Default durumda dosyanın varlığı sorgulanır. İleride ele alacağımız `options` parametresi ile dosyaya erişim olup olmadığı da sorgulanabilmektedir.

>Aşağıdaki örnekte dosyanın varlığı sorgulanmaktadır

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2]);  
          
        writeLine("Exists")  
    }  
    catch (e) {  
        writeLine("Not exist")  
    }  
}  
  
main()
```

>Aslında `fs` modülü içerisinde `exists` isimli bir fonksiyon da bulunur. Ancak bu fonksiyon uzun süredir `deprecated` durumdadır. Bu sebeple kullanılması tavsiye edilmez. Nodejs'nin resmi dökumanlarına göre `exists` fonksiyonu yerine `stat` ya da `access` fonksiyonu önerilmektedir. Ayrıca `fs` modülü içerisinde `senkron` olarak çalışan `existsSync` isimli fonksiyon da bulunmaktadır. Bu fonksiyon predicate bir fonksiyondur yani boolean türüne geri döner. Her ne kadar dosyanın var olup olmadığının kontrolü çok hızlı bir biçimde yapılabilse de bu fonksiyonun ana thread içerisinde kullanımı tavsiye edilmez.

>Aşağıdaki demo örnekte `existsSync` fonksiyonunun ana thread'de çağrıldığına dikkat ediniz

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
import fs from "fs";  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    if (!fs.existsSync(process.argv[2])) {  
        try {  
            await fsp.mkdir(process.argv[2])  
        } catch (e) {  
            process.stderr.write(`Problem occurred:${e}\r\n`)  
        }  
    }  
    else  
        writeLine(`${process.argv[2]} exists`)  
}  
  
main()
```

**Anahtar Notlar:** `fs` modülünde bulunan fonksiyonların hemen hepsinin senkron olarak çalışan versiyonları da bulunur. Bu fonksiyonlarının isimlerinin sonunda `Sync` bulunur.

>Bir dizine ilişkin bilgiler `opendir` fonksiyonu ile elde edilebilir. Bu fonksiyon ile dizin girişi (directory entry) elde edilir. Bir dizin girişinde isim ve parentPath bilgisi bulunur. 

>Aşağıdaki demo örneği inceleyiniz

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
  
const writeDirEntry = async (path) => {  
    try {  
        const dir = await fsp.opendir(path)  
  
        for await (const entry of dir) {  
            writeLine("------------------------")  
            for (const f in entry)  
                writeLine(`${f} -> ${entry[f]}`);  
            writeLine("------------------------")  
        }  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred:${e.message}`)  
    }  
} 
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2])  
        await writeDirEntry(process.argv[2])  
    }  
    catch (ex) {  
        writeErrLine(`'${process.argv[2]}' not exists`)  
    }  
}  
  
main()
```

>Aşağıdaki demo örneği inceleyiniz

```javascript
import {write, writeErrLine, writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
import p from "path";  
  
const writeInfo = async (path) => {  
    try {  
        const s = await fsp.stat(path)  
  
        write(`${p.basename(path)} is `)  
        if (s.isFile())  
            writeLine(`a regular file -> Size:${s.size}`);  
        else if (s.isDirectory())  
            writeLine("a directory");  
        else if (s.isFIFO())  
            writeLine("a fifo");  
        else if (s.isSymbolicLink())  
            writeLine("a symbolicLink");  
        else if (s.isSocket())  
            writeLine("a socket");  
        else if (s.isCharacterDevice())  
            writeLine(" a character Device");  
        else if (s.isBlockDevice())  
            writeLine("slock Device");  
        else  
            writeLine("an other device")  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in stat: ${e.message}`)  
    }  
}  
  
const writeDirEntry = async (path) => {  
    try {  
        const dir = await fsp.opendir(path)  
  
        for await (const entry of dir)  
            await writeInfo(p.resolve(entry.parentPath, entry.name));  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in opendir:${e.message}`)  
    }  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2])  
        await writeDirEntry(process.argv[2])  
    }  
    catch (ex) {  
        writeErrLine(`'${process.argv[2]}' not exists`)  
    }  
}  
  
main()
```

>`readDir` fonksiyonu ile de dizine ilişkin bilgiler elde edilebilmektedir. Bu fonksiyon ile dosya isimleri bir dizi olarak elde edilmektedir

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
  
const writeDirEntry = async (path) => {  
    try {  
        (await fsp.readdir(path)).forEach(file => writeLine(file))  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred:${e.message}`)  
    }  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2])  
        await writeDirEntry(process.argv[2])  
    }  
    catch (ex) {  
        writeErrLine(`'${process.argv[2]}' not exists`)  
    }  
}  
  
main()
```

>Aşağıdaki demo örneği inceleyiniz

```javascript
import {write, writeErrLine, writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
import p from "path";  
  
const writeInfo = async (path) => {  
    try {  
        const s = await fsp.stat(path)  
  
        write(`${p.basename(path)} is `)  
        if (s.isFile())  
            writeLine(`a regular file -> Size:${s.size}`);  
        else if (s.isDirectory())  
            writeLine("a directory");  
        else if (s.isFIFO())  
            writeLine("a fifo");  
        else if (s.isSymbolicLink())  
            writeLine("a symbolicLink");  
        else if (s.isSocket())  
            writeLine("a socket");  
        else if (s.isCharacterDevice())  
            writeLine(" a character Device");  
        else if (s.isBlockDevice())  
            writeLine("slock Device");  
        else  
            writeLine("an other device")  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in stat: ${e.message}`)  
    }  
}  
  
const writeDirEntry = async (path) => {  
    try {  
        (await fsp.readdir(path)).forEach(async (file) => await writeInfo(p.resolve(path, file)))  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in opendir:${e.message}`)  
    }  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2])  
        await writeDirEntry(process.argv[2])  
    }  
    catch (ex) {  
        writeErrLine(`'${process.argv[2]}' not exists`)  
    }  
}  
  
main()
```

>`opendir` fonksiyonunun options parametresi dizinleri dolaşırken bazı seçenekler vermek için kullanılır. options bir object türünden verilebilir. Bu object'in `recursive` alan değeri true olarak verilirse dizinlerin içerisindeki dizinlerde `recursive` bir biçimde dolaşılabilir. 


>Aşağıdaki demo örneği inceleyiniz

```javascript
import {write, writeErrLine, writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
import p from "path";  
  
let totalSize = 0  
  
const setTotalSize = async (path) => {  
    try {  
        const s = await fsp.stat(path)  
  
        if (!s.isDirectory())  
            totalSize += s.size;  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in stat: ${e.message}`)  
    }  
}  
  
const walkDirectory = async (path) => {  
    try {  
        const dir = await fsp.opendir(path, { recursive: true })  
  
        for await (const entry of dir)  
            await setTotalSize(p.resolve(entry.parentPath, entry.name));  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in opendir:${e.message}`)  
    }  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2])  
        await walkDirectory(process.argv[2])  
  
        writeLine(`Total Size:${totalSize}`)  
    }  
    catch (ex) {  
        writeErrLine(`'${process.argv[2]}' not exists`)  
    }  
}  
  
main()
```

>Burada `totalSize` için global değişken kullanılmıştır. Örnek aşağıdaki gibi yerel değişken kullanılarak da yazılabilir

```javascript
import {write, writeErrLine, writeLine} from "./csd/util/console/console.js";  
import fsp from "fs/promises";  
import p from "path";  
  
const getSize = async (path) => {  
    try {  
        const s = await fsp.stat(path)  
  
        return s.isDirectory() ? 0 : s.size  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in stat: ${e.message}`)  
        throw e  
    }  
}  
  
const calculateTotalSize = async (path) => {  
    try {  
        const dir = await fsp.opendir(path, {"recursive": true})  
        let totalSize = 0  
  
        for await (const entry of dir)  
            totalSize += await getSize(p.resolve(entry.parentPath, entry.name))  
  
        return totalSize  
    }  
    catch (e) {  
        writeErrLine(`Problem occurred in opendir:${e.message}`)  
        throw e  
    }  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        process.stderr.write("Wrong number of arguments\r\n")  
        process.exit(1)  
    }  
  
    try {  
        await fsp.access(process.argv[2])  
        const totalSize = await calculateTotalSize(process.argv[2])  
  
        writeLine(`Total Size:${totalSize}`)  
    }  
    catch (ex) {  
        writeErrLine(`'${process.argv[2]}' not exists`)  
    }  
}  
  
main()
```


>Yukarıdaki örneğin aşağıdaki yapılışını ve `DirectoryInfo` sınıfını inceleyiniz

```javascript
import fsp from "fs/promises";  
import p from "path";  
import fs from "fs";  
  
export class DirectoryInfo {  
    constructor(path) {  
        this._path = path  
        let e = null  
        fs.stat(path, (ex, s) => {if (ex) e = ex; else if (!s.isDirectory()) e = new Error(`${path} is not a directory`)})  
  
        if (e)  
            throw e  
    }  
  
    async calculateTotalSize() {  
        const dir = await fsp.opendir(this._path, { recursive: true })  
        let totalSize = 0  
  
        for await (const entry of dir) {  
            const s = await fsp.stat(p.resolve(entry.parentPath, entry.name))  
  
            if (!s.isDirectory())  
                totalSize += s.size;  
        }  
  
        return totalSize  
    }  
  
    get path() {  
        return this._path  
    }  
  
    //...  
}
```

```javascript
import fsp from "fs/promises";  
import p from "path";  
import fs from "fs";  
  
export class DirectoryInfo {  
    constructor(path) {  
        this._path = path  
        let e = null  
        fs.stat(path, (ex, s) => {if (ex) e = ex; else if (!s.isDirectory()) e = new Error(`${path} is not a directory`)})  
  
        if (e)  
            throw e  
    }  
  
    async calculateTotalSize() {  
        const dir = await fsp.opendir(this._path, { recursive: true })  
        let totalSize = 0  
  
        for await (const entry of dir) {  
            const s = await fsp.stat(p.resolve(entry.parentPath, entry.name))  
  
            if (!s.isDirectory())  
                totalSize += s.size;  
        }  
  
        return totalSize  
    }  
  
    get path() {  
        return this._path  
    }  
  
    //...  
}
```

##### EventEmitter Sınıfı

>Bu sınıf ile programcı kendi `event-driven` mimarisini yani algoritmik olarak `event-driven` çalışmayı gerçekleştirebilir. Bu sınıf `events` modülünde bulunur. Sınıfın `emit` metodu ile bir event, ismi ve verisi ile tetiklenebilir. Sınıfın `addListener` metodu ile bir event için register işlemi yapılabilir. `addListener` metodu yerine `on` metodu ile de register işlemi gerçekleştirilebilir. `once` fonksiyonu tetiklenen bir event yalnızca bir kez dinlenebilir. `removeListener` veya `off` fonksiyonu ile register edilmiş bir event unregister edilebilir. `removeAllListeners` metodu ile tüm register edilmiş event'ler unregister edilebilir. 

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import {RandomIntGenerator} from "./csd/random/RandomIntGenerator.js";  
  
const main = () => {  
    const gen = new RandomIntGenerator(10, -5, 5, 1000)  
    const notPrimeCallback = v => writeLine(`${v} -> not-prime`)  
  
    gen.on("prime", v => writeLine(`${v} -> prime`))  
    gen.on("even", v => writeLine(`${v} -> even`))  
    gen.on("odd", v => writeLine(`${v} -> odd`))  
    gen.on("zero", () => writeLine("zero"))  
    gen.run()  
  
    setTimeout(() => {  
        gen.off("not-prime", notPrimeCallback)  
    }, 5000)  
}  
  
main()
```

```javascript
import {randomInt} from "../util/random/random.js";  
import {isPrime} from "../util/numeric/numeric.js";  
import * as events from "node:events";  
  
export class RandomIntGenerator {  
    constructor(count, min, max, period) {  
        this._count = count  
        this._min = min  
        this._max = max  
        this._period = period  
        this._n = 0  
        this._event = new events.EventEmitter()  
    }  
  
    on(name, action) {  
        this._event.on(name, action)  
    }  
  
    off(name, action) {  
        this._event.off(name, action)  
    }  
  
    _randomGeneratorCallback(event) {  
        const val = randomInt(this._min, this._max + 1)  
  
        ++this._n  
        if (val === 0)  
            event.emit("zero")  
  
        if (isPrime(val))  
            event.emit("prime", val)  
  
        if (val % 2 === 0)  
            event.emit("even", val)  
        else  
            event.emit("odd", val)  
  
        if (this._count === this._n)  
            clearInterval(this._interval)  
    }  
  
    run() {  
        this._interval = setInterval(() => this._randomGeneratorCallback(this._event), this._period)  
    }  
}
```

>Aşağıdaki demo örnekte `EventEmitter` sınıfından `türetme (inheritance)` yapılmıştır. Şüphesiz `ES6` sonrası için türetme böyle bir senaryoda daha uygundur

```javascript
import {writeLine} from "./csd/util/console/console.js";  
import {RandomNumberGenerator} from "./csd/random/RandomNumberGenerator.js";  
  
const main = () => {  
    const gen = new RandomNumberGenerator(10, -5, 5, 1000)  
    const notPrimeCallback = v => writeLine(`${v} -> not-prime`)  
  
    gen.on("positive", v => writeLine(`${v} -> positive`))  
    gen.on("negative", v => writeLine(`${v} -> negative`))  
    gen.on("zero", () => writeLine("zero"))  
    gen.run()  
}  
  
main()
```

```javascript
import {randomNumber} from "../util/random/random.js";  
import * as events from "node:events";  
  
export class RandomNumberGenerator extends events.EventEmitter {  
    constructor(count, min, max, period) {  
        super()  
        this._count = count  
        this._min = min  
        this._max = max  
        this._period = period  
        this._n = 0  
    }  
  
    _randomGeneratorCallback(ee) {  
        const val = randomNumber(this._min, this._max + 1)  
  
        ++this._n  
  
        if (val > 0)  
            ee.emit("positive", val)  
        else if (val < 0)  
            ee.emit("negative", val)  
        else  
            ee.emit("zero")  
  
        if (this._count === this._n)  
            clearInterval(this._interval)  
    }  
  
    run() {  
        this._interval = setInterval(() => this._randomGeneratorCallback(this), this._period)  
    }  
}
```
###### Text ve Binary Dosyalar

>Bilgisayar dünyasında içeriklerine göre dosyalar kabaca **text** ve **binary** dosyalar biçiminde ikiye ayrılmaktadır.  Aslında bu ayrım tamamen mantıksal düzeydedir. Dosyanın içerisinde ne olursa olsun dosyalar byte topluluklarından oluşurlar. Dosyaların uzantıları onların içerisinde ne olduğuna yönelik bir ipucu vermek için düşünülmüştür.  İçerisinde yalnızca yazıların bulunduğu dosyalara **text** dosyalar, içerisinde yazıların dışında başka birtakım bilgilerin de bulunduğu dosyalara **binary** dosyalar denilmektedir. Örneğin notepad’te oluşturmuş olduğumuz dosyalar  tipik text dosyalardır. Halbuki uzantısı `.exe` veya `.obj` olan dosyaların içerisinde yazı yoktur. Bunlar tipik binary dosyalardır. Uzantısı `.doc` olan veya `.docx` olan dosyalar da aslında `binary` dosyalardır. Her ne kadar bu  dosyaların içerisinde yazılar varsa da yazıların dışında başka `metadata` bilgileri de vardır.  
>
>Text ve binary modda açılan dosyalar için Windows ve Unix/Linux (Mac OS X dahil) sistemlerinde farklılıklar  bulunmaktadır. Bir dosya text modda açılmışsa ve çalışılan sistem windows ise yazma yapan herhangi bir fonksiyon  Line feed (LF) ('\n') karakterini yazdığında aslında dosyaya Carriage Return (CR)('\r') ve LF karakterlerinin ikisi  birden yazılır. Benzer şekilde text dosyadan okuma yapan fonksiyonlar çalışılan sistem Windows ise ve dosya text modda  açılmışsa CRLF karakterlerini yan yana gördüğünde yalnızca LF olarak okuma yaparlar. Bu konu ileride detaylandırılacaktır.
>
>Uzantı ne olursa olsun dosyaların içerisinde byte yığınları vardır. Biz de temelde dosyalardan byte okuyup onlara byte yazarız. Dosya içerisindeki her bir byte'ın ilk byte 0(sıfır) olmak üzere artan sırada bir pozisyon numarası vardır.  Buna dosya terminolojisinde ilgili byte’ın offset’i denilmektedir. Dosya göstericisi bir imleç gibi (kalemin ucu gibi) düşünülebilir. Dosya göstericisi o anda dosyanın neresinden itibaren okuma ya da yazma yapılacağını anlatan bir konum (offset) belirtir:  
    x x x x x x x x  
    0 1 2 3 4 5 6 7   
>
>Bu örnekte dosya göstericisinin 2 numaralı offset'i gösterdiğini düşünelim. Biz artık 2 byte'lık bir okuma yaparsak  2 ve 3 numaralı offset'teki byte'ları okuruz. Okuma ve yazma metotları okunan ya da yazılan miktar kadar dosya  göstericisini otomatik ilerletmektedir. Dosya açıldığında dosya göstericisi özel modlarda açılmamışsa başlangıçta  0(sıfır)'ıncı offset'tedir. Yazma sırasında dosya göstericisinin gösterdiği yerden itibaren eski bilgiler ezilerek  yeni bilgiler yazılır. Fakat, özel bir durum olarak dosya göstericisi dosyanın sonundaysa dosyaya yazma yapıldığında  dosya büyütülmektedir. Başka bir deyişle bu durumda dosyaya yazma işlemi ekleme (append) anlamına gelir.  
###### Dosya Göstericisinin EOF Durumu  
  
>Dosya göstericisinin dosyanın son byte'ından sonraki byte'ı göstermesi durumuna **EOF (End Of File)** durumu denir.  EOF durumundan okuma yapılamaz. Fakat dosya göstericisi EOF durumundayken dosyaya yazma yapılabilir. Bu durum dosyaya  ekleme anlamına gelir. Dosyaya ekleme yapmanın taşınabilir (portable) başka bir yolu yoktur. Dosya göstericisinin  dosyanın son byte’ından sonraki byte’ı göstermesi taşınabilir olarak mümkündür. Ancak daha ileride bir yeri taşınabilir olarak göstermesi söz konusu değildir.  
  
**Anahtar Notlar:** Bazı işletim sistemleri dosyanın sonundan daha ileriye konumlanmaya ve veri yazmaya izin verebilmektedir.  Bu duruma genel olarak `dosya delikleri (file holes)`  denir. Aşağı seviyede anlamlıdır. Her işletim sistemi  desteklemeyebileceğinden, kullanılması taşınabilir olmaz.

>`fs` ve `fs/promises` modüllerinde bulunan `writeFile` fonksiyonu ile bir veri dosyaya yazılabilir.

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {writeFile} from "fs/promises"  
  
const main = async () => {  
    if (process.argv.length !== 4) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        await writeFile(process.argv[2], process.argv[3], {flag: "a"})  
        writeLine("Data written successfully")  
    }catch (e) {  
        writeErrLine(`Error occurred:${e.message}`)  
    }  
}  
  
main()
```
>Yukarıdaki işlem aşağıdaki gibi `fs` modülündeki `writeFile` fonksiyonu ile aşağıdaki gibi yapılabilir.

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {writeFile} from "fs"  
  
const main = () => {  
    if (process.argv.length !== 4) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    writeFile(process.argv[2], process.argv[3] + "\r\n", {flag: "a"}, e => {  
        if (!e)  
            writeLine("Data written successfully")  
        else  
            writeErrLine(`Error occurred:${e.message}`)  
    })   
}  
  
main()
```
>`fs/promises` modülünün `readFile` fonksiyonu ile dosyanın tüm verisi okunabilir. Bu fonksiyon dosyanın tamamını okuduğundan çok büyük dosyalar için kullanımı çok efektif değildir, hatta duruma göre çok bir dosya okunamayabilir. Bu fonksiyonun `options` parametresinde `encoding` default null değerindedir. Değerin null olması durumunda okunan bilgili `Buffer` türünden yani binary formattadır. Encoding değeri null dışı uygun bir değer verildiğinden dosyanın içeriğinde text okuma da yapılabilmektedir. `options` parametresinin `flag` değeri default olarak `r` yani salt okuma modudur. Bu durumda dosya bulunamazsa error oluşur

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {readFile, stat} from "fs/promises"  
  
const doStat = async (stats) => {  
    if (!stats.isDirectory()) {  
        const data = await readFile(process.argv[2])  
  
        writeLine(data.toString())  
    }  
    else  
        throw new Error(`${process.argv[2]} is a directory`)  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        await doStat(await stat(process.argv[2]))  
    }  
    catch (err) {  
        writeErrLine(`Error occurred while reading file:${err.message}`)  
    }  
}  
  
main()
```

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {readFile, stat} from "fs/promises"  
  
const doStat = async (stats) => {  
    if (!stats.isDirectory()) {  
        const data = await readFile(process.argv[2], {encoding: "utf8"})  
          
        writeLine(data)  
    }  
    else  
        throw new Error(`${process.argv[2]} is a directory`)  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        await doStat(await stat(process.argv[2]))  
    }  
    catch (err) {  
        writeErrLine(`Error occurred while reading file:${err.message}`)  
    }  
}  
  
main()
```
>Peki çok büyük bir dosya nasıl okunacaktır? Bunun en tipik yöntemlerden biri dosyayı `blok (block/chunk)` olarak okumaktır. Bu yöntemde `tampon (buffer)` kullanılır ve iteratif olarak okuma yapılır. Nodejs'de blok blok okuma yapmak için `createReadStream` fonksiyonu kullanılabilir. Bu fonksiyon ile elde edilen `stream'in` `data` isimli even'i ile her adımda veri okunabilir, `error` isimli event'i ile herhangi bir hata durumu handle edilebilir, `end` isimli eventt'i ile dosya sonuna (EOF) gelindiğinde yapılacak işlemler belirlenebilir. Fonksiyonun options parametresine ilişkin nesnenin pek çok elemanı vardır. `highWaterMark` elemanı okunacak tampon uzunluğunu belirtmek için kullanılır. Default olarak `64K` verilmiştir. Nesnenin `start` ve `end` elemanları ile okunacak byte aralığı belirlenebilir. `start` değeri default olarak sıfır, `end` değeri default olarak `Infinity` biçiminde belirlenmiştir. `Infinity` değeri dosyanın sonuna kadar okumak anlamına gelir. Okuma aralığı `[0, Number.MAX_SAFE_INTEGER]` şeklindedir. Programcı bu alan ile tampon uzunluğunu belirleyebilir. Nesnenin diğer elemanları için ilgili dökumantasyona başvurulabilir:

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {stat} from "fs/promises"  
import {createReadStream} from "fs"  
  
const doStat = (stats, bufSize) => {  
    if (!stats.isDirectory()) {  
        const stream = createReadStream(process.argv[2], {highWaterMark: bufSize})  
  
        stream.on("data", data => {  
            writeLine(data.length)  
            //...  
        })  
  
        stream.on("error", err => writeErrLine(`Error occurred while reading:${err.message}`))  
        stream.on("end", () => writeLine("File read successfully."))  
    }  
    else  
        throw new Error(`${process.argv[2]} is a directory`)  
}  
  
const main = async () => {  
    if (process.argv.length !== 4) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        const bufSize = parseInt(process.argv[3], 10)  
        doStat(await stat(process.argv[2]), bufSize)  
    }  
    catch (err) {  
        writeErrLine(`Error occurred:${err.message}`)  
    }  
}  
  
main()
```

>`fs/promises` modülündeki `copyFile` fonksiyonu ile kopyalama işlemi yapılabilir. Bu fonksiyon default olarak hedef dosya varsa `truncate/overwriten` yapar. Fonksiyonun üçüncü parametresine `fs.constants.COPYFILE_EXCL` değeri girildiğinde hedef dosya varsa fonksiyon başarısız olur. 

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {stat, copyFile} from "fs/promises"  
import fs from "fs"  
  
const copy = async () => {  
    try {  
        await copyFile(process.argv[2], process.argv[3], fs.constants.COPYFILE_EXCL)  
        writeLine("File copied successfully")  
    }  
    catch (err) {  
        writeErrLine(`Error occurred while copying file: ${err}`)  
    }  
}  
  
const doCopy = async (stats) => {  
    if (!stats.isDirectory())  
        await copy()  
    else  
        throw new Error(`${process.argv[2]} is a directory`)  
}  
  
const main = async () => {  
    if (process.argv.length !== 4) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        await doCopy(await stat(process.argv[2]))  
    }  
    catch (err) {  
        writeErrLine(`Error occurred:${err.message}`)  
    }  
}  
  
main()
```

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {stat, copyFile} from "fs/promises"  
import fs from "fs"  
  
const copy = async () => {  
    try {  
        await copyFile(process.argv[2], process.argv[3])  
        writeLine("File copied successfully")  
    }  
    catch (err) {  
        writeErrLine(`Error occurred while copying file: ${err}`)  
    }  
}  
  
const doCopy = async (stats) => {  
    if (!stats.isDirectory())  
        await copy()  
    else  
        throw new Error(`${process.argv[2]} is a directory`)  
}  
  
const main = async () => {  
    if (process.argv.length !== 4) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        await doCopy(await stat(process.argv[2]))  
    }  
    catch (err) {  
        writeErrLine(`Error occurred:${err.message}`)  
    }  
}  
  
main()
```

>Bir dosyayı açmak için `fs` veya `fs/promises` modülündeki `open` fonksiyonu kullanılabilir. Bu fonksiyon ismine `file handle` denilen bir nesnenin adresine geri döner. Bu değer ile çeşitli fonksiyonlar çağrılabilir. Örneğin `readLine` fonksiyonu ile bir dosya satır satır okunabilmektedir.

```javascript
import {writeErrLine, writeLine} from "./csd/util/console/console.js";  
  
import {stat, open} from "fs/promises"  
  
const readLines = async () => {  
    try {  
        const fh = await open(process.argv[2])  
          
        for await (const line of fh.readLines({encoding:"utf-8"}))  
            writeLine(line)  
    }  
    catch (err) {  
        writeErrLine(`Error occurred while opening file: ${err.message}`);  
    }  
}  
  
const doStat = async (stats) => {  
    if (!stats.isDirectory())  
        await readLines()  
    else  
        throw new Error(`${process.argv[2]} is a directory`)  
}  
  
const main = async () => {  
    if (process.argv.length !== 3) {  
        writeErrLine("Wrong number of arguments")  
        process.exit(1)  
    }  
  
    try {  
        await doStat(await stat(process.argv[2]))  
    }  
    catch (err) {  
        writeErrLine(`Error occurred:${err.message}`)  
    }  
}  
  
main()
```


##### Linux Dizin Yapısı

>`Linux Foundation Group` `UNIX` sistemlerindeki dizin yapısını standardize etmeye çalışmıştır. Bu standarda `File System Hierarchy Standard` denir. Buna göre bazı dizinler ve anlamları şunlardır:
>
>`/bin:` Burada kabuk (shell) komutlarına ilişkin executable dosyalar ve çeşitli utility programlar bulunur.
>
>`/sbin:` Burada sisteme ilişkin aşağı seviyeli executable dosyalar ve çeşitli utility programlar bulunur. Örneğin sistemin boot edilmesi için gereken dosyalar buradadır. Genel olarak `/sbin` içerisindeki dosyalar normal kullanıcılar için değil sistem yöneticileri yani root kullanıcısı içindir.
>
>`/boot:` Bu dizinde `boot loader` eve bazı çekirdeğe (kernel) ilişkin dosyalar bulunur. Linux dağıtımlarında `lilo`, `grub` gibi bazı popüler boot loader'lar kullanılır.
>
>`/lib:` Burada `/bin` ve `/sbin` içerisinde bulunan programların kullandığı kütüphaneler bulunur.
>
>`/dev:` Burada aygıt sürücülere (device driver) ilişkin dosyalar bulunmaktadır.
>
> `/etc:` Bu dizin "etcetera" sözcüğünün kısaltmasından oluşturulmuştur. İlk zamanlarda bu dizin diğer dizinlerde olmayacak şeyleri içeriyordu. Sonraki yıllarda burada olanlar da gittikçe belirgin olmaya başlamıştır. Bu dizinde genel olarak çeşitli konfigürasyon bilgileri tutulur. Bu nedenle etc ismi artık **editable text configuration** kısaltması olarak kullanılmaktadır
>
>`/home:` Burada kullanıcılar için ayrılan dizinler tutulur. Normal olarak her kullanıcın kullanıcı ismine ilişkin bir dizini vardır.
>
>`/mnt:` Kullanıcıların mount işlemi için kullanabilecekleri genel bir dizindir.
>
>`/root:` Bu dizin root kullanıcısı için home dizini görevindedir.
>
>`/media:` Bu dizin çıkarılabilir aygıtların (CDROM, Flash EPROM vb.) mount edildiği dizindir.
>
>`/usr:` Burada kullanıcıların yerleştirdiği ya da install ettiği tüm yazılımlara ilişkin executable dosyalar, kütüphaneler ve bazı geliştirme araçları için gereken dosyalar bulunur. `/usr/bin` dizininde genel olarak dağıtıma ilişkin utility programlar bulunur. `/usr/local` lokal makinedeki programlar için düşünülmüştür.
>
>`/var:` Bu dizin log dosyaları gibi sistemin çalışması sırasında sürekli güncellenen dosyaların tutulduğu bir dizindir. Bu dizinin de pek çok alt dizini vardır
>
>`/sys:` Aygıt sürücülerin ve çekirdeğe ilişkin bazı dosyaların bulunduğu dizindir
> 
>`/tmp:` Geçici dosyalar için bulundurulan bir dizindir. Genellikle sistem kapatılırken silinmektedir

##### Sisteme Giriş (login)

>`UNIX` sistemlerinde her kullanıcıya bir username ve bir password verilir. Bir kullanıcı username ve password ile sisteme giriş (login) yapar. Sisteme giriş yapmak genellikle 3 yoldan yapılabilir:
>
>1. **Text tabanlı bir terminal program ile:** Eğer sistemde bir Graphical User Interface (GUI) (tipik olarak Xwindow) yoksa bu yoldan giriş yapılır. Genellikle sunucu (server) sistemlere bu şekilde erişilir.
>
>2. **GUI ile:** Eğer sistemde bir GUI varsa bunlarla giriş yapılabilir.
>
>3. **Uzak bağlantı (remote) yoluyla:** Uzak bağlantı yoluyla erişim tipik olarak `ssh` ve `telnet` gibi bir protokolle text tabanlı olarak, VNC gibi protokol ile de GUI olarak yapılabilmektedir. Örneğin ssh ile bağlatı şu şekilde yapılabilir:

```
ssh oguz@192.168.1.123
```

>Burada tipik olarak `oguz` kullanıcı ismi ve `@` işaretinden sonra yazılan bilgi ise uzak makinenin adres bilgisidir.


##### UNIX/Linux Sistemlerinde Yeni Kullanıcıların ve Grupların Yaratılması:

>UNIX sistemlerinin çoğunda kullanıcılara ilişkin bilgiler text dosyalarda tutulur. Bu text dosyanın her satırı bir kullanıcıya ilişkin bilgilerden oluşur. `Linux` ve `BSD` sistemlerinde `/etc/passwd` dosyası kullanıcı bilgilerini tutan bir dosyadır. Her kullanıcının bilgisi burada tutulur. Bu dosya normal kullanıcılar için **read only** durumdadır. Yani bu dosyanın içeriğini normal kullanıcılar görüntüleyebilir ancak dosyada değişiklik yapamaz. Bir kullanıcıya ilişkin bilgiler `:` ile ayrılır ve toplam 7 tane sütun bulunur:

```
deniz:x:1001:1002:Deniz Karan,605,,,Junior:/home/deniz:/bin/bash
```

>Buradaki 7 sütunun anlamları kabaca şu şekildedir:

>1. Kullancı ismi

>2. Kullanıcının password'üne ilişkin `encrypted` bir bilgidir. Eskiden kullanıcılar şifrelenmiş parola bilgileri bu dosyada saklanırdı. Bu anlamda şifrelenmiş bilgilerin şifrelemesi tek yönlü (one way) yapıldığı için bu bilginin elde edilmesinde bir sakınca görülmemiştir. Zamanla bu bilginin de görülmesi istenmediğinden `/etc/passwd` dosyasında `x` olarak yazılmaya başlandı. Bu bilgi ayrı bir dosyada saklanır duruma geldi. Bu bilgi tipik olarak `/etc/shodow` dosyası içerisinde saklanır ve bu dosyanın içeriği normal kullanıcılar tarafından okunamaz ve değiştirilemez.

>3. Kullanıcı id'si her kullanıcı ismine karşılık verilir. İki kullanıcının id'si aynı olamaz. Tipik olarak `root` kullanıcısının id bilgisi sıfırdır.

>4. Grup id'si her gruba karşılık verilir. Kullanıcıların ait olduğu grupların bilgileri de `/etc/group` dosyasında tutulur. Her yeni kullanıcı için default olarak ayrı bir grup oluşturulur

>5. Kullanıcıya ilişkin bilgiler bulunur. Bilgiler virgül ile ayrılır. Bilgiler boş geçilebilir ancak genel olarak virgüller yine bulundurulur.

>6. Kullanıcı dizinine ilişkin yol ifadesi belirtilir

>7. Kullanıcının sisteme ilk giriş yaptığında çalıştırılacak terminal program belirtilir. Buradaki program default olarak çalıştırılır. Linux sistemlerinde default olarak `bash` (Bourne Again Shell) kullanılır.

>Öyleyse kullanıcı eklemek için tipik olarak `/etc/passwd` dosyasına uygun satırı eklemek gerekir. Tabi bu durumda kullanıcı dizini, password ve grup id gibi bilgilerin de oluşturulması gerekir. Bu işlemleri manuel olarak yapmak oldukça zahmetli olabilmektedir. Bu sebeple `adduser` isimli bir komut vardır. Ancak bu komut pek user friendly değildir. Bu sebeple daha user friendly olan `useradd` isimli ayrı bir komut vardır. User oluşturabilmek için root yetkisine sahip olmak gerekir. root yetkisine sahip olan bir user'a `sudoer` denir. sudoer olan bir user ile login olunduğunda `sudo` (super user do) isimli komut ile root şifresi de girilerek root yetkisi elde edilebilir. Eğer user sudoer değilse kesinlikle root yetkisine sahip işlemleri yapamaz.

**Anahtar Notlar:** Bazı lightweight sistemlerde kurulum sırasında root kullanıcısına ilişkin bilgiler sorulmaz. Tipik olarak `Ubuntu` ve `Mint` dağıtımları bu şekildedir. Bu sistemler kurulurken belirlenen ilk user sudoer yapılır ve parolası aynı zamanda root kullanıcısının da parolası olur.

>`useradd` için örnek bir kullanım aşağıdaki gibidir

```
sudo useradd -m bekir -s /bin/bash -d /home/bekir
```

>Burada bekir isimli bir kullanıcı yaratılmış, shell olarak /bin/bash verilmiş ve kullanıcı dizini olarak da /home/bekir olarak verilmiştir. Kullanıcı eklendikten sonra `passwd` programı ile kullanıcının şifresi de belirlenebilir. Şüphesiz `passwd` programı da `root` olarak çalıştırılmalıdır.

```
sudo passwd bekir
```

>Benzer şekilde bu sistemlerde grup da oluşturulabilir. Bunun için de `addgroup` ve daha user friendly olan `groupadd` programları kullanılabilir. Grup oluşturma ve kullanıcıların gruplara eklenmesi gibi kavramlar projeler içerisinde kullanılacaktır.

##### İşletim Sistemlerinin Dosya Sistemleri

>İçerisinde bilgilerin bulunduğu **ikincil belleklerdeki (secondary memory)** alanlara dosya (file) denir. Bu bilgiler **sektör (sector)** denilen okunabilen ve yazılabilen en küçük birimlerde tutulur. İşletim sistemleri bu organize edilmiş bilgileri dışarıya dosya kavramı olarak gösterirler. Aslında dosya mantıksal bir kavramdır. İşletim sistemlerinin bu organizasyonu yapan alt birimine **dosya sistemi (file system)** denir. Dosya sistemi Unix/Linux sistemlerinin adeta kalbi biçimindedir. Bu sistemlerde pek çok kavram dosya gibi ele alınır. Örneğin klasik dosyalar, dizin. ler (directories), borular (pipes), soketler (sockets) vb.

>Bu sistemlerde bir çeşit `polymorphism` uygulanmıştır. Örneğin bir dosyaya yazma yaptığımızda dosyanın türüne göre yazma işlemi gerçekleşir. Yani gerçek anlamda bir dosyaya yazma olmayabilir. Polymorphic yaklaşım dolayısıyla Linux sistemlerinin dosya sistemine **sanal dosya sistemi (virtual file system)** de denilmektedir.
##### Unix/Linux Sistemlerinde Dosya Erişim Hakları

>**Dosyaya erişim uygulamalar tarafından yapılır.**  Örneğin bir dosyanın içeriğini cat programı ile stdout'a göndermek istediğimizde `cat` programı dosyayı okumak için açar ve okuma işlemlerini yapar. Bu durumda cat programının bu dosyayı okumak için yetkisinin olması gerekir. İşletim sistemlerinde çalışan bir programa process denir. Unix/Linux sistemlerinde process'lere ilişkin bilgiler `ps` isimli bir komut (program) ile elde edilebilir.
>
>Örneğin `ps -ef` biçiminde bir çalıştırma ile process'lere ilişkin detay bilgiler elde edilebilir. Bu sistemlerde her process'lerin id değerleri vardır. Bu id değeri sistem genelinde tekil (unique) olarak belirlenir. Process için ayrıca çalışma zamanında değişebilen (detayları önemsiz) effective user id ve effective group id denilen id değerleri de vardır. Bunun dışında real user id ve real group id denilen id değerleri de bulunur. Bu sistemlerde bir dosyanın da bir user id'si ve bir group id'si bulunur. Dosyalar için effective veya gerçek id gibi kavramlar yoktur. Bir dosyanın erişim hakları, user ve group id vb bilgileri `ls` isimli bir program ile elde dilebilir. Örneğin `ls -l` biçiminde çalıştırıldığında bulununan directory'nin içerisindeki tüm dosyalar çeşitli bilgileri ile birlikte listelenir:

```
crw-r--r--  1 root      root     10, 235 Aug 24 14:39 autofs
drwxr-xr-x  2 root      root         420 Aug 30 13:11 block
drwxr-xr-x  2 root      root          80 Jul 26 20:01 bsg
crw-rw----  1 root      disk     10, 234 Aug 24 14:39 btrfs-control
drwxr-xr-x  3 root      root          60 Jul 26 20:01 bus
lrwxrwxrwx  1 root      root           3 Jul 26 20:01 cdrom -> sr0
drwxr-xr-x  2 root      root        3900 Aug 30 13:36 char
crw--w----  1 root      tty       5,   1 Aug 24 14:39 console
lrwxrwxrwx  1 root      root          11 Jul 26 20:01 core -> /proc/kcore
crw-------  1 root      root     10, 123 Aug 24 14:39 cpu_dma_latency
crw-------  1 root      root     10, 203 Jul 26 20:01 cuse
drwxr-xr-x  9 root      root         180 Aug 24 14:39 disk
drwxr-xr-x  2 root      root          80 Jan  1  1970 dma_heap
drwxr-xr-x  3 root      root         100 Jul 26 20:01 dri
crw-------  1 root      root     10, 125 Aug 24 14:39 ecryptfs
crw-rw----  1 root      video    29,   0 Aug 24 14:39 fb0
lrwxrwxrwx  1 root      root          13 Jul 26 20:01 fd -> /proc/self/fd
crw-rw-rw-  1 root      root      1,   7 Aug 24 14:39 full
crw-rw-rw-  1 root      root     10, 229 Aug 30 13:13 fuse
crw-------  1 root      root    237,   0 Aug 24 14:57 hidraw0
crw-------  1 root      root    237,   1 Aug 24 14:57 hidraw1
crw-------  1 root      root    237,   2 Aug 24 14:57 hidraw2

```


>Burada `3.` ve `4.` sütunlar sırasıyla dosyanın user id'si ve grup id'sini belirtir. Aslında burada id'lerin değeri doğrudan yazmaz. Her kullanıcı ismine ve grup ismine karşılık birer id değeri verildiğini anımsayınız. Dosyanın erişim hakları aslında dosya ile hangi işlemlerin yapılıp yapılmayacağını belirtir. Bu anlamda yukarıdaki birinci sütunda dosyanın türü ve erişim hakları bilgisi bulunur. En soldaki bilgi dosyanın türünü belirtir. Bu bilgi `-` ise dosya normal bir dosyadır `(regular file)`, `d` ise bir `dizin` belirtir, `p` ile bir `pipe` belirtir, `s` ise bir `soket` belirtir, `c` ise bir `chracter device` belirtir, `b` ise bir `block device` belirtir, `l` ise `symbolic link` belirtir. Burada normal dosya ve dizinler için erişim haklarını inceleyeceğiz. Birinci sütundaki dosya türünden sonra gelen 9 karakter üçerli üç gruba ayrılır. Bu üçerli gruplar `rwx` biçiminde oluşturulur. Eğer dosya için okuma hakkı varsa `r`, yazma hakkı varsa `w` ve çalıştırma (execute) hakkı varsa `x` yazılır. Hakkın olmaması durumunda `-` ile belirtilir. Buradaki ilk üçlü sahiplik `owner`, ikinci üçlü grup `group`, üçüncü üçlü ise diğerinin `others` haklarını temsil eder. Normal bir dosya için okuma hakkı dosyanın verilerini okuma hakkı anlamındadır. Örneğin `cat` process'inin bir dosyanın içeriğine erişmesi için `r` hakkına sahip olması gerekir. Dosya bir dizinse `r` hakkı o dizin içerisindeki dosya bilgilerinin elde edilmesi anlamındadır. Örneğin `ls` programının ilgili dizindeki dosya bilgilerini elde etmesi için o dizinin `ls` için `r` hakkı olması gerekir. Normal bir dosya için `w` hakkı dosyanın verileri üzerinde değişiklik yapma hakkıdır. Örneğin bir process'in bir dosyaya veri eklemesi için `w` hakkı olması gerekir. Bir dizin için `w` hakkı o dizin içerisinde olan bir dosyanın silinmesi veya yeni bir dosya eklenebilmesi hakkıdır. Normal bir dosya için `x` hakkı o dosyanın çalıştırılabilmesi (execute) hakkıdır. İşletim sistemi düzeyinde bir programın çalıştırılabilmesi için `x` hakkına sahip olması gerekir. Bir dosyaya erişirken kullanılan yol ifadesinde bulunan dizinlerin x hakkı yoksa o dizinlerden geçilemez. Örneğin yol ifadesi `/a/b/c/test.txt` biçimindeyse burada `test.txt` dosyasına erişmek için root, a, b ve c dizinlerinin x hakkına sahip olması gerekir. Aksi durumda erişilemez. Bu durumda bir dizin için r ve w hakkı olmayabilir. Ancak o dizinden geçiş yapılabilir.
>
>Bu erişimler bir process için şu şekilde bakılarak elde edilir. Bir process bir dosyaya erişmek istediğinde process'in effective user id'si ile erişmek istediği dosyanın user id'si aynı ise dosyanın sahiplik hakları söz konusu olur, değilse process'in effective group id'si erişmek istediği dosyanın group id'si ile aynı ise grup hakları söz konusu olur, değilse diğerleri için olan hakları söz konusu olur.
>
>Bir dosyanın erişim hakları tipik olarak `chmod` isimli bir program kullanılarak değiştirilebilir. Bu program kullanıcıya ait olmayan bir dosya için `root` olarak çalıştırılmalıdır. `chmod` komutu oldukça kapsamlıdır. `+w`, `+r`, `+x` seçenekleri ile ilgili erişim hakları tüm 3'erli gruplara verilebilir. Benzer şekilde `-w`, `-r`, `-x` seçeneği ile haklar silinebilir. Bu komutun önemli bir kullanımı da ilgili hakların octal sistemde değer verilerek kullanılmasıdır. Her bir 3'lü octal sistemde bir değer ile belirlenir. `chmod` komutuna sıfır ile birlikte 3 tane octal digit yazılarak erişim hakları belirlenir. Örneğin `test` isimli dosyanın erişim hakkının `rwxr-x--x` şekilde olması için `chmod` komutu şu şekilde kullanılabilir:

```
chmod 0751 test
```

>Burada pek çok sistemde octal sayısının başındaki sıfır yazılmayabilir:

```
chmod 751 test
```

**Anahtar Notlar:** Burada anlatılanların dışında pek çok detay bulunmaktadır. Nodejs programcısı açısından gerekenler genel olarak anlatılmıştır.

##### git Versiyon Kontrol Sistemi

git, özellikle yazılım geliştirmede kullanılan bir versiyon takip aracıdır. git, 2005 senesinde `Linus Torvalds` tarafından `Linux çekirdek projesi (Linux Kernel Project)` kapsamında geliştirilmiştir. İlerleyen senelerde pek çok firma ve geliştirici tarafından kullanılır duruma gelmiştir. git'in önemli iki özelliği `dağıtık (distributed)` olması ve güvenli bir biçimde yapılan işlemlerin geçmişini (history) tutabilmesidir. Dağıtık demekle, git ile çalışan bir proje bulunduğu ana bilgisayarın dışında başka bilgisayarlara da kopyalanıp aynı anda geliştirme yapılabilmektedir. Kendi lokalinde çalışan yazılımcılar aynı zamanda yaptıklarını ana bilgisayara aktarabilirler ve bütün bu yapılanların geçmişi git tarafından tutulur ve kopyalayan da kendi lokalinde bu geçmişe sahip olabilir. git üzerinde burada anlatılanların ve diğer detaylar için bir terminolojisi bulunur. git günümüzde pek çok IDE veya benzeri uygulamalar tarafında görsel olarak da desteklenmektedir.
###### git Kurulumu

git komut satırından çalışan bir uygulamadır. Tipik olarak tüm sistemler için geliştirilmiştir. Unix/Linux sistemleri ve Mac OS X sistemleri için ilgili paket yöneticisi kullanılarak kurulabilmektedir. Windows için [git download](https://git-scm.com/downloads/win) bağlantısından kurulum detayları incelenebilir.
###### Temel Kavramlar

**1. Repository:** Proje dosyalarının bulunduğu yerdir (storage space). git'de repository ikiye ayrılır:
- Local Repository: Proje dosyalarının yerel makinedeki kopyalarıdır.
- Remote Repository: Projenin ana dosyalarının bulunduğu yerdir. 
**2. Commits:** Projenin belirli bir zamandaki anlık durumudur (snapshot). Her commit işlemi unique olarak bir hash bilgisine sahiptir ve yapılan değişiklerinin belirlenebildiği bir mesaj bilgisine sahiptir. Bu sayede proje geçmişi izlenebilir.
**3: Branches:** Geliştirme aşamasında ayrı bir yolu belirtir. Default branch `main` ya da `master` olarak adlandırılır. Programcı kendisi de branch'lar oluşturabilmektedir.

**4. Merge:** Bir branch'daki değişiklikleri bir araya getirme yani entegre etme işlemidir. Bu anlamda bazı conflict durumları olabilir. Merge işlemi sırasında confilict'ler çözülür.
**5. Clone:** Bir remote repository'nin yerel bir kopyasının oluşturulması işlemidir. Bu kopya tüm branch'ları ve commit geçmişini içerir. 

**6. Pull:** Remote repository'ki güncellemeleri almak ve yerel repository'ye eklemek anlamında kullanır.
**7. Push:** Yerel değişikliklerin remote repository'ye gönderilerek diğer kişilerin de kullanımına açılmasıdır. 

Bir repository'nin lokalde kopyası aşağıdaki komut ile yapılabilir:

```
git clone https://github.com/oguzkaran/JavaApp1-Aug-2025-case-study.git
```

```
git branch
```

komutu ile o repository içerisindeki tüm branch'lar listelenir. Aktif branch'n (checkout) başında `*` karakteri bulunur.  Bir branch yaratıp o branch'a checkout yapılması için `git checkout` komutu `-b` seçeneği ile kullanılmalıdır. 

```
git checkout -b feature/tcpconnection/okrn
```

Varolan bir branch'a checkout yapılması için `-b` seçeneği kullanılmaz

```
git checkout feature/tcpconnection/okrn

```

```
git status
```

komutu ile repository'nin o anki durumu incelenebilir. Yapılmış olan bir değişiklik 

```
git add .
```

komutu ile eklenebilir. Burada `.` tüm değişiklikler anlamında isterse programcı ilgili dosyaları yazarak istediği dosyaları ekleyebilir (to be staged).

```
git rm -r --cached .
```

komutu ile git'e eklenmiş olanlar geri alınabilir (rollback/to be unstaged). `-r` seçeneği `recursive` anlamına gelir.

```
git commit -m "initial commit server.js"
```


```
git push
```

komutu ile lokalden remote repository'ye aktarım yapılabilir. Burada remote repository'nin konuşlandığı server'ın konfigürasyonu yapılması gereken bazı ek işlemler olabilir. Bu git doğrudan uygulamasına ilişkin bir konu değildir. 

```
git pull
```

komutu ilgili branch'ın son durumu lokale çekilebilir.

##### npm Paket Yöneticisi

`npm` Nodejs dünyasında (aslında Javascript ve/veya Typescript dünyasında) standart olarak kullanılan bir paket yöneticidir. Genel olarak Nodejs geliştirme ortamı ile birlikte otomatik olarak kurulur. İsterse programcı ayrı bir paket olarak da kurabilir. `npm` paket yöneticisine alternatif olarak `yarn` ya da `pnpm` de kullanılabilmektedir. `yarn`, `pnpm'e` göre daha çok kullanılmaktadır.

`npm` ile bir paketi install etmek için `install` seçeneği kullanılır. 

```bash
npm install
```

biçiminde kullanıldığında proje içerisindeki tüm gereklilikleri install eder. Eğer specific olarak bir paket yüklemek istenirse

```bash
npm install <paket ismi>
```

biçiminde kullanılır. Örneğin:

```bash
npm install mocha
```

Burada `mocha` paketi npm'in ana repsitory'sinden install edilir. Bu kullanımda install proje düzeyinde yapılır. `npm 5` sürümüne kadar, u komut aşağıdaki gibi kullanılırdı:

```bash
npm install mocha --save
```

`npm 5+` için --save seçeneği default seçenektir. 

`npm`, update seçeneği ile var olan paketlerin son sürümleri güncellenebilir:

```bash
npm update
```

Eğer bir paketin özellikle versiyonu belirtilecekse şu genel biçimde çalıştırılabilir:

```bash
npm install <paket ismi>@<versiyon>
```

Örneğin,

```bash

npm install mocha@10.0.0
```

Bir paket global düzeyde install edilmek isteniyorsa `-g` seçeneği ile çalıştırılabilir:

```bash
npm install mocha -g
```

##### Yazılımda Test Süreçleri

Yazılımda test süreçleri ürün geliştirmenin önemli bir aşamasını oluşturmaktadır. Bazı yazılımlarda, ürünün her şeyiyle doğru olması kritik öneme sahip olabilmektedir. Bazı yazılımlarda hata toleransları olabilir. Gerektiğinde düzeltilebilir.

Eskiden yazılım geliştirmede test süreçleri lüks olarak değerlendiriliyordu. Bu nedenle yalnızca büyük firmalar test bölümleri barındırıyorlardı. Ancak günümüzde yazılımda kalite (software quality) bilinci daha fazla artmış ve test süreçleri daha bilinir ve kullanılır hale gelmiştir. Geliştirilen araçların da bu konuda etkisi büyüktür.

Yazılımda test süreçleri için çeşitli stratejiler kullanılabilmektedir. Test işlemi en aşağı düzeyde programcının kendi yazdığı kodları test etmesi ile başlar. Buna **birim testi (unit testing)** denir. Programcı genel olarak, yazmış olduğu bir fonksiyonun doğru çalışıp çalışmadığını test eder (duruma göre "etmelidir"). İşte burada bir fonksiyon bir **birim (unit)** olarak düşünülür. Bir yazılımda aslında parçalar bir araya getirilir. Yani fonksiyonlar çağrılarak yazılım geliştirilir. Bu bir araya getirme işlemi sonucunda genellikle parçalar yeniden test edilir. Buna da **entegrasyon testi (integration testing)** denilmektedir. Yazılımın önemli parçalarına **modül (module)** denir. Modüller de ayrı ayrı test edilebilir. Buna da **modül testi (module testing)** denir. Nihayet ürün oluşturulur ve bir bütün olarak test edilir. Genellikle bu testlere **kabul testleri (acceptance testing)** denir. Ürün bir bütün olarak önce kurum içerisinde test bölümleri tarafından test edilir. Genellikle bu testlere **alfa testi (alpha testing)** denir. Sonra ürün seçilmiş bazı son kullanıcılara dağıtılır ve gerçek hayat testine sokulur. Buna genellikle **beta testi (beta testing)** denir.

Birim testi için pratikte şu 3 yaklaşımdan biri uygulanır:

- Hiç birim testi yapmamak: Bu durum yazılım geliştirmede tavsiye edilmese de bir takım özel sebeplerden dolayı firmalar tarafından uygulanabilmektedir. Örneğin geliştirici ekibin sayı olarak azlığı, projenin deadline'ının kısa olması, rakip firmalardan önce ürünü çıkarma kaygısı vb. durumlarda karşılaşılabilmektedir. Buradaki yaklaşım programcının hiç test yapmaması değil, programcıdan bir test beklentisi olmaması ya da özellikle test yapmasının istenmemesi gibi düşünülebilir. Şüphesiz programcı geliştirme sürecinde belirli ölçüde test yapacaktır.

- Katı katıya birim testi yapmak: Bu durumda neredeyse her birim test edilir. Örneğin bir fonksiyonun basit ya da karmaşık olmasına bakılmaksızın birim testi yapılır. Bu durumda zaman kaybı olmaması için birim testi yapan programcıların ayrı olması ideal bir durumdur. Şüphesiz herhangi bir zaman kısıtı yoksa ya da zaman çok uzunsa da uygulanabilir.

- Gereken birimler için birim testi yapmak: Aslında görünürde en ideal durum budur. Görece basit birimler test edilmez ya da detaylı olarak test edilmez. Bu durumda hangi birimlerin test edileceğinin, hangi birimlerin belirli ölçüde test edileceğinin, hangi birimlerin test edilmeyeceğinin belirlenmesi önemlidir. Bu da geliştiriciler ve yöneticiler açısından tecrübe gerektirebilir.

Birim testleri genel olarak iki şekilde yapılır: **manuel birim testleri, bazı araçlar ile otomatik olarak yapılan birim testleri**. Pratikte duruma göre ikisi de tercih edilebilse de otomatik araçlar ile yapılan testler belirli ölçüde testi yapan programcının gereksiz kodları yazmasını engellediğinden daha çok tercih edilir. Hatta bazı firmalar kendi birim testi araçlarını da yazabilirler.

Nodejs'de birimleri testleri için çok kullanılan framework'ler şunlardır: **Mocha, Jest, AVA, Jasmine.** Bu framework'ler nmp ile doğrudan install edilebilir. Birim testleri IDE'ler gibi bazı araçlarla çok daha kullanışlı hale gelirler Aslında bu araçların temel amacı birim testini yapan programcının test işlemini mümkün olduğunca otomatize etmesidir. Bu araçlar ile çoğu durumda, her zaman yazılması gereken kodlar programcıya bırakılmaz. Bu durumda programcı için önemli olan, yani odaklanması gereken, test senaryolarını belirlemek ve yazmaktır. Bu senaryolar için her zaman genel olan durumlar söylenemez. Test edilecek birimin ne olduğuna göre, nasıl test edileceğine göre vb. durumlar için değişiklik gösterebilir.

Birim test araçlarının çoğunda kullanılan genel bazı terimler vardır: **setup, teardown, input, expected, actual vb.**

**setup:** Test fonksiyonun çağrılmasından önce yapılması gereken ilk işlemlerdir.
**teardown:** Test fonksiyonunun çağrılmasından sonra yapılması gereken son işlemlerdir.
**input:** Test yapılacak birimin girdisidir.
**expected:** Test yapılacak birimin beklenen sonucudur.
**actual:** Test yapılmış birimden elde edilen sonuçtur.

Şüphesiz her birim için bu kavramların kullanılması gerekmez.

**Anahtar Notlar:** Test işlemlerinde karşılaştığımız önemli iki terim vardır: **Verification & Validation (V&V)**. Verification, yazılmış olan kodun doğru çalışmasıdır. Validation ise kodun doğru işi yapmasıdır.

###### Mocha

Mocha, aşağıdaki biçimde sistem düzeyinde install edilebilir.

```bash
npm install mocha -g
```

Birim testi için tipik olarak `assert` modülü kullanılır. 