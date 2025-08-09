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

>Aşağıdaki demo örnekte EventEmitter sınıfından türetme (inheritance) yapılmıştır. Şüphesiz ES6 sonrası için türetme böyle bir senaryoda daha uygundur

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

>Bilgisayar dünyasında içeriklerine göre dosyalar kabaca “text” ve “binary” dosyalar biçiminde ikiye ayrılmaktadır.  
   Aslında bu ayrım tamamen mantıksal düzeydedir. Dosyanın içerisinde ne olursa olsun dosyalar byte topluluklarından  
   oluşurlar. Dosyaların uzantıları onların içerisinde ne olduğuna yönelik bir ipucu vermek için düşünülmüştür.  
   İçerisinde yalnızca yazıların bulunduğu dosyalara “text” dosyalar, içerisinde yazıların dışında başka birtakım  
   bilgilerin de bulunduğu dosyalara “binary” dosyalar denilmektedir. Örneğin notepad’te oluşturmuş olduğumuz dosyalar  
   tipik text dosyalardır. Halbuki uzantısı “.exe” ve ya “.obj” olan dosyaların içerisinde yazı yoktur. Bunlar tipik  
   binary dosyalardır. Uzantısı “.doc” olan veya “.docx” olan dosyalar da aslında “binary” dosyalardır. Her ne kadar bu  
   dosyaların içerisinde yazılar varsa da yazıların dışında başka metadata bilgileri de vardır.  
  
>Text ve binary modda açılan dosyalar için Windows ve Unix/Linux (Mac OS X dahil) sistemlerinde farklılıklar  bulunmaktadır. Bir dosya text modda açılmışsa ve çalışılan sistem windows ise yazma yapan herhangi bir fonksiyon  Line feed (LF) ('\n') karakterini yazdığında aslında dosyaya Carriage Return (CR)('\r') ve LF karakterlerinin ikisi  birden yazılır. Benzer şekilde dosyadan okuma yapan fonksiyonlar çalışılan sistem Windows ise ve dosya text modda  açılmışsa CRLF karakterlerini yan yana gördüğünde yalnızca LF olarak okuma yaparlar. Bu konu ileride detaylandırılacaktır.

>Uzantı ne olursa olsun dosyaların içerisinde byte yığınları vardır. Biz de temelde dosyalardan byte okuyup onlara  byte yazarız. Dosya içerisindeki her bir byte'ın ilk byte 0(sıfır) olmak üzere artan sırada bir pozisyon numarası vardır.  Buna dosya terminolojisinde ilgili byte’ın offset’i denilmektedir. Dosya göstericisi bir imleç gibi (kalemin ucu gibi) düşünülebilir. Dosya göstericisi o anda dosyanın neresinden itibaren okuma ya da yazma yapılacağını anlatan bir konum (offset) belirtir:  
    x x x x x x x x  
    0 1 2 3 4 5 6 7   
>
>Bu örnekte dosya göstericisinin 2 numaralı offset'i gösterdiğini düşünelim. Biz artık 2 byte'lık bir okuma yaparsak  2 ve 3 numaralı offset'teki byte'ları okuruz. Okuma ve yazma metotları okunan ya da yazılan miktar kadar dosya  göstericisini otomatik ilerletmektedir. Dosya açıldığında dosya göstericisi özel modlarda açılmamışsa başlangıçta  0(sıfır)'ıncı offset'tedir. Yazma sırasında dosya göstericisinin gösterdiği yerden itibaren eski bilgiler ezilerek  yeni bilgiler yazılır. Fakat, özel bir durum olarak dosya göstericisi dosyanın sonundaysa dosyaya yazma yapıldığında  dosya büyütülmektedir. Başka bir deyişle bu durumda dosyaya yazma işlemi ekleme (append) anlamına gelir.  
  
###### Dosya Göstericisinin EOF Durumu  
  
>Dosya göstericisinin dosyanın son byte'ından sonraki byte'ı göstermesi durumuna EOF (End Of File) durumu denir.  EOF durumundan okuma yapılamaz. Fakat dosya göstericisi EOF durumundayken dosyaya yazma yapılabilir. Bu durum dosyaya  ekleme anlamına gelir. Dosyaya ekleme yapmanın taşınabilir (portable) başka bir yolu yoktur. Dosya göstericisinin  dosyanın son byte’ından sonraki byte’ı göstermesi taşınabilir olarak mümkündür. Ancak daha ileride bir yeri taşınabilir olarak göstermesi söz konusu değildir.  
  
**Anahtar Notlar:** Bazı işletim sistemleri dosyanın sonundan daha ileriye konumlanmaya ve veri yazmaya izin verebilmektedir.  
Bu duruma genel olarak dosya delikleri (file holes) denir. Aşağı seviyede anlamlıdır. Her işletim sistemi  
desteklemeyebileceğinden, Java'da doğrudan yapılamaz. Ayrıca yapılsa bile program taşınabilir olmaz


