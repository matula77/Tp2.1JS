class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}
class CurrencyConverter {
    apiUrl='(https://www.frankfurter.app/)'
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.currencies = [];
        }
     /*'(https://www.frankfurter.app/currencies/)'*/
     async getCurrencies() {
        const response = await fetch(`${this.apiUrl}/currencies`);
        //const response = await fetch(`./currencies.json`);// no trae los datos ni de un archivo !!
        const data = await response.json();
        this.currencies = data;
        console.log(`Datos obtenidos: ${data}`);

        this.currencies = this.currencies.map((currency) => new Currency(currency.code, currency.name));

        console.log(`Datos cargados: ${this.currencies}`);
    }

/*3. `convertCurrency`: Método asíncrono que realiza una petición al endpoint `/latest` 
de la API de Frankfurter para obtener la conversión de una moneda a otra.

    - El método recibe los siguientes parámetros:
        - `amount`: monto a convertir, un número.
        - `fromCurrency`: código de la moneda de origen, una instancia de la clase `Currency`.
        - `toCurrency`: código de la moneda de destino, una instancia de la clase `Currency`.
    - Dependiendo de los parámetros recibidos, el método debe realizar diferentes acciones:
        - Si el atributo `code` de `fromCurrency` (fromCurrecy.code)
         es igual al atributo     `code` de `toCurrency` (toCurrency.code),
        el método debe retornar el monto(return amount)
         sin realizar ninguna petición.
        - Si los códigos de moneda son diferentes(else)
        , el método debe realizar una petición HTTP 
        a la API y retornar el monto convertido, el cual es un número.
        - El método debe manejar errores en caso de que la petición falle y retornar `null` 
        en caso de error. 
        async convertCurrency(amount, fromCurrency, toCurrency) {
            */
    async convertCurrency(amount, fromCurrency, toCurrency) {
        if (fromCurrency.code === toCurrency.code) {
            return amount;
        }else{
            try{
            const response = await fetch(`${this.apiUrl}/latest?amount
            =<input_amount>&from=<from_currency>&to=<target_currency>`);
                const data = await response.json();
                return data.rates[toCurrency.code];
                }
            catch{(error)=> {
                    console.error(error);
                     return null;
            }
    }
}}}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("conversion-form");
    const resultDiv = document.getElementById("result");
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");

    const converter = new CurrencyConverter("https://api.frankfurter.app");

    await converter.getCurrencies();
    populateCurrencies(fromCurrencySelect, converter.currencies);
    populateCurrencies(toCurrencySelect, converter.currencies);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = converter.currencies.find(
            (currency) => currency.code === fromCurrencySelect.value
        );
        const toCurrency = converter.currencies.find(
            (currency) => currency.code === toCurrencySelect.value
        );

        const convertedAmount = await converter.convertCurrency(
            amount,
            fromCurrency,
            toCurrency
        );

        if (convertedAmount !== null && !isNaN(convertedAmount)) {
            resultDiv.textContent = `${amount} ${
                fromCurrency.code
            } son ${convertedAmount.toFixed(2)} ${toCurrency.code}`;
        } else {
            resultDiv.textContent = "Error al realizar la conversión.";
        }
    });

    function populateCurrencies(selectElement, currencies) {
        if (currencies) {
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency.code;
                option.textContent = `${currency.code} - ${currency.name}`;
                selectElement.appendChild(option);
            });
        }
    }
});
