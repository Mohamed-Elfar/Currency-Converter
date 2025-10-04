import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function convert() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
      );
      const data = await res.json();
      console.log(data);
      console.log(data.rates[toCurr]);
      setConverted(data.rates[toCurr]);
      setIsLoading(false);
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setConverted("");
      return;
    }

    if (fromCurr === toCurr) return setConverted(amount);
    convert();
  }, [amount, fromCurr, toCurr]);
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">💱 Currency Converter</h1>
          <p className="subtitle">Convert currencies in real-time</p>
        </header>

        <main className="converter">
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="amount" className="label">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                className="amount-input"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="currency-section">
            <div className="currency-input">
              <label htmlFor="from-currency" className="label">
                From
              </label>
              <select
                id="from-currency"
                className="currency-select"
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                disabled={isLoading}
              >
                <option value="USD">🇺🇸 USD</option>
                <option value="EUR">🇪🇺 EUR</option>
                <option value="CAD">🇨🇦 CAD</option>
                <option value="INR">🇮🇳 INR</option>
                <option value="GBP">🇬🇧 GBP</option>
                <option value="JPY">🇯🇵 JPY</option>
                <option value="AUD">🇦🇺 AUD</option>
              </select>
            </div>

            <button
              className="swap-button"
              onClick={() => {
                setFromCurr(toCurr);
                setToCurr(fromCurr);
              }}
              disabled={isLoading}
              aria-label="Swap currencies"
            >
              ⇄
            </button>

            <div className="currency-input">
              <label htmlFor="to-currency" className="label">
                To
              </label>
              <select
                id="to-currency"
                className="currency-select"
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                disabled={isLoading}
              >
                <option value="USD">🇺🇸 USD</option>
                <option value="EUR">🇪🇺 EUR</option>
                <option value="CAD">🇨🇦 CAD</option>
                <option value="INR">🇮🇳 INR</option>
                <option value="GBP">🇬🇧 GBP</option>
                <option value="JPY">🇯🇵 JPY</option>
                <option value="AUD">🇦🇺 AUD</option>
              </select>
            </div>
          </div>

          <div className="result-section">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <span>Converting...</span>
              </div>
            ) : (
              <div className="result">
                {amount && converted ? (
                  <>
                    <div className="conversion-display">
                      <span className="amount-from">
                        {amount} {fromCurr}
                      </span>
                      <span className="equals">=</span>
                      <span className="amount-to">
                        {converted} {toCurr}
                      </span>
                    </div>
                    <div className="rate-info">
                      1 {fromCurr} = {(converted / amount).toFixed(4)} {toCurr}
                    </div>
                  </>
                ) : (
                  <div className="placeholder">Enter an amount to convert</div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
