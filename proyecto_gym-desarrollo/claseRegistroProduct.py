class Registro:
    def __init__(self,miBD):
        self.miBD = miBD
        self.conexion = self.miBD.connect()
        self.cursor=self.conexion.cursor()
        