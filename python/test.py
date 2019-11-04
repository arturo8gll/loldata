#!/home/arturo/virtualenv/ml/bin/python
import pandas as pd
import numpy as np
import sys




def test():
    a=np.array(sys.argv[1::])
    test=pd.read_pickle("./pickles/logistic.pickle")
    return test.predict([a.astype(float)])
print(test()[0])