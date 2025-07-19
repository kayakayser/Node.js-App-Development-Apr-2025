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

>Nodejs'de dosya işlemlerine ilişkin fonksiyonlar `fs` isimli standart modül içerisinde bulunur. 

