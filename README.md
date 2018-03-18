# PoliMi Pride

[![Build Status](https://travis-ci.org/poliedro-polimi/polimipride.it.svg?branch=master)](https://travis-ci.org/poliedro-polimi/polimipride.it) ![Language](https://img.shields.io/badge/language-python-blue.svg) ![Python versions](https://img.shields.io/badge/python-3.5%2C%203.6%2C%20pypy3-blue.svg) [![license](https://img.shields.io/github/license/poliedro-polimi/Crowdfunding-Backend.svg)](https://github.com/poliedro-polimi/polimipride.it/blob/master/LICENSE)

Sito web per l'iniziativa [PoliMi Pride](https://polimipride.it) (ancora in fase di sviluppo).

Il sito è scritto in Python con Flask, ed è hostato su [GitHub Pages](https://github.com/poliedro-polimi/polimipride.it/tree/gh-pages) grazie a [Frozen-Flask](https://pythonhosted.org/Frozen-Flask/) e [Travis CI](https://travis-ci.org/).


Per eseguirlo in locale:

### 1. Creazione del virtualenv
```shell
python3 -m venv polimipride_venv
source polimipride_venv/bin/activate
```

### 2. Installazione
```shell
pip install --upgrade https://github.com/poliedro-polimi/polimipride.it/archive/master.zip
```

##### Modalità development

Se si dispone di un clone del repository git, è possibile installare il pacchetto in modalità development, per rendere subito disponibili le modifiche al codice.

```shell
cd path/to/polimipride.it/
pip install -e .
```

### 3. Esecuzione

##### i. Server di debug di Flask
```shell
export FLASK_APP=polimipride
export FLASK_DEBUG=1
flask run
```

##### ii. Generazione sito statico
```shell
export FLASK_APP=polimipride
flask freeze
```

Se si non si è installato il pacchetto Python in modalità development, Frozen-Flask posizionerà il sito in qualche directory difficile da trovare. È possibile specificare la destinazione manualmente:

```shell
# Directory "build" sotto la directory corrente
flask freeze --dest "$(pwd)/build"
```




## Compatibilità

Il software è scritto e viene testato su Python3 e PyPy3. La compatibilita con Python2 e PyPy non è garantita.

In linea di massima è compatibile con tutti i sistemi operativi per i quali è disponibile Python3 e tutte le dipendenze richieste; tuttavia viene testato solo su Linux.