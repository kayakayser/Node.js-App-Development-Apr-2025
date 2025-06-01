##### Algoritma Kavramı ve Algoritma Analizi

>Algoritma bir problemin çözümüne ulaştıran doğru adımlara denir. Algoritmaların anlatımında belli bir formal yöntem  yoktur. Genel olarak **sahte kodlar (pseudo codes)** kullanılarak açıklanır. Algoritmalar, açıklama bakımından genel olarak dilden bağımsızdır. Ancak ince noktalara gelindiğinde algoritmalar da dile bağımlı hale gelir. Örneğin, bir dilde belli bir işi daha kolay yapan deyimler bulunabilir. Bu durumda algoritma o deyimlerle implemente edilir.  
>
>Bir algoritmanın işleyişinin masaya yatırılmasına **algoritma analizi (analysis of algorithm)** denir. Bu analiz genel olarak Matematiksel yöntemler kullanılarak yapılır. İki algoritmanın karşılaştırılabilmesi için kullanılan ölçüye **algoritmanın karmaşıklığı (complexity of algorithm)** denir. Algoritmanın karmaşıklığı için temel iki ölçüt kullanılır:  **Hız (speed), Kaynak Kullanımı (resource usage)**. Burada baskın ölçüt hızdır. Yani daha çok algoritmalar hızlarına göre karşılaştırılır. Ancak bazı durumlarda kaynak kullanımı da göz önüne alınır. Bu durumlar hızın göz önüne alınması göre az da olsa önemli durumlardır. Her iki ölçütün de en iyi olduğu durum çoğu zaman mümkün olmaz.  
>
>Örneğin aşağıdaki gibi yazılmış, en büyük sayıyı bulma algoritması için:  

```javascript
let a = [...]
let max = a[0]

for (let i = 1; i < a.length ++i)  
    if (max < a[i])  
        max = a[i]
```

>Burada toplam işlemin sayısı `max = a[i]` işlemine bağlıdır. Bu algoritma için dizinin elemanları bilinmeden bu işlemin ne kadar yapıldığı anlaşılamaz. İşte algoritma analizinde işlemlerin sayısı hesaplanırken üç durum dikkate alınır: 
> 
>1. Ortalama durum (average case condition)  
>2. En kötü durum (worst case condition)  
>3. En iyi durum (best case condition)  
>
>En kötü durum olabileceklerinin en kötüsüdür. Yukarıdaki örnekte en kötü durumda `max = a[i]` işlemi `n - 1` kez  yapılır. Ortalama durum tüm olasılıkların ortalamasını temsil eder. Buna göre yukarıdaki örnekte `max = a[i]` işlemi  `(n - 1) / 2` kez yapılır. En iyi durum olabileceklerin en iyisini temsil eder. Yani `max = a[i]` işlemi hiç yapılmaz.  Algoritma analizinde en iyi durumun çok yararı yoktur. Çünkü aşırı iyimserlik programlamada çok değerli değildir. En  kötü durum senaryosu önemlidir. Bazı algoritmalar için en kötü duruma hazırlıklı olmak gerekebilir. En önemli durum ortalama durumdur. Ortalama durum algoritmanın karakterini en iyi belirten durumdur. Genel olarak algoritma analizi  ortalama durum ve en kötü durum için yapılır  
>
>Algoritmalarda işlem sayısına ilişkin analizler çok da kolay değildir. Özellikle ortalama durumu hesaplamak bazen çok karmaşık olabilmektedir. Algoritmaları pratik bakımdan karşılaştırmak için **asimtotik notasyonlardan** yararlanılır. Bunlardan en çok kullanılanı **Big O** notasyonudur. Bu notasyonda belli karakterdeki algoritmalar aynı kategoride kabul edilir. Eğer bir algoritma birden fazla kategoriye sahipse en kötü duruma ilişkin kategori gerçek kategoridir.  

**Anahtar Notlar:** Bir program ömrünü genel olarak döngülerde geçirir. Dolayısıyla algoritmaların karşılaştırılmasında genel olarak döngüler kullanılır.  
  
**Anahtar Notlar:** Asimtotik gösterilişte iki algoritma aynı kategoride olsa da tam anlamıyla aynı sayıda işlem yapılmıyor olabilir. Örneğin bir dizinin en büyük elemanını bulma algoritması ile dizinin elemanlarının toplamını bulma algoritmalarının her ikisi de tek bir döngü içerdiği için aynı kategoridedir. Şüphesiz her ikisinin işlem sayısı aynı değildir. Yine örneğin bir algoritma iç içe iki döngü içerip, devamında tekil n tane döngü içeriyorsa, bu algoritma yalnızca iç içe iki döngü içeren algoritma ile aynı kategoridedir ancak işlem sayısı aynı değildir .
  
>Algoritmanın karmaşıklığının `Big O` notasyonu ile iyiden kötüye doğru kategorileri şunlardır:  
>
>- **Polinomsal karmaşıklar (polynomial complexity) :**
>
>	- **O(1):** Sabit karmaşıklık: Döngü yok. Bir üçgenin alanının bulunması, Dizinin bir elemanına erişim.  
>	- **O(logn):** Logaritmik karmaşıklık (2 tabanında): Tek bir döngü var, her adımda dönme sayısı yarı yarıya azalıyor.  Örneğin binary search algoritması.
>	- **O(n):** Doğrusal karmaşıklık: Tek döngü. Örneğin bir dizinin elemanları toplamının bulunması, bir dizinin en büyük  elemanının bulunması 
>	- **O(n * logn):** nlogn karmaşıklık (2 tabanında): İç içe iki döngü var birisinde her adımda dönme sayısı yarı yarıya düşüyor. Örneğin, quick sort 
>	- **O(n ^ 2) :** Karesel karmaşıklık: İç içe iki döngü var. Örneğin, bir matrisin elemanları toplamının bulunması, bubble sort ve selection sort algoritmaları, iki matrisin toplanması 
>	- **O(n ^ 3):** Küpsel karmaşıklık: İç içe üç döngü var. Örneğin, matris çarpımı, bir dikdörtgen prizmanın tüm noktalarının dolaşılması.  
>	- ...
>	- **O(n ^ k):** k-sal karmaşıklık (k sabit): İç içe k tane döngü var  
>
>- **Polinomsal olmayan karmaşıklar (non-polynomial ya da kısaca NP complexity) :**
>	- **O(k ^ n):** Üstel karmaşıklık (k sabit). Örneğin n elemanlı bir kümenin tüm alt kümelerini dolaşan bir algoritma  
>	- **O(n!):** Faktoriyel karmaşıklık. Örneğin, gezgin satıcı problemi  
  
**Anahtar Notlar:** NP algoritmalara ilişkin kesin çözümler günümüzdeki bilgisayarlarla bile ya çok uzun zamanda yapılabilmekte ya da yapılamamaktadır. Bu sebeple bu problemlerin çözümleri sezgisel (heuristic) olarak yani en yakın çözüm olacak şekilde tasarlanır. Halen bu tip problemlerin çözümleri üzerinde çalışılmaktadır.  
  
>Bir algoritma `çoğu zaman` herhangi bir karmaşlıktayken, bazı zamanlar (bu az olmalıdır) üst bir karmaşıklıkta çalışıyorsa, bu tarz karmaşıklıklara **amortized (time) complexity** ya da **amortized (time) cost** denir. Örneğin bir algoritma çoğu zaman O(1), bazı zamanlarda O(n) karmaşıklıkta çalışıyor ise **constant amortized (time) complexity/cost** denir.