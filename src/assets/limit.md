# Dimostrazione di $\lim_{x \to 0} {{sinx} \over {x}} = 1$

La dimostrazione di questo limite notevole fondamentale richiede l'utilizzo della **circonferenza goniometrica**.

<img src="https://qph.cf2.quoracdn.net/main-qimg-ef07e38d6cdccf241e8d0a68b41d504b" style="width: 100%; border-radius: 1em">

Impostiamo una disuguaglianza partendo da ciò che abbiamo a disposizione.

$$ sinx \le \overline{CB} \le tanx $$

Per il **teorema della corda sottesa ad un arco**, abbiamo che:

$$ sinx \le \overset{\Large\frown}{CB} \le tanx $$

Ma l'arco, ragionando in radianti, non è altro che **x**.

$$ sinx \le x \le tanx $$

Proseguendo si ha:

$$ sinx \le x \le tanx $$
$$ 1 \le {{x}\over{sinx}} \le {{1}\over{cosx}} $$
$$ 1 \ge {{sinx}\over{x}} \ge cosx $$

Applicando il **teorema del confronto**:

$$ \lim_{x \to 0} 1 \ge \lim_{x \to 0} {{sinx}\over{x}} \ge \lim_{x \to 0} cosx $$
$$ 1 \ge \lim_{x \to 0} {{sinx}\over{x}} \ge 1 $$

$$ \lim_{x \to 0} {{sinx}\over{x}} = 1 $$

Ecco dimostrato il primo limite notevole.