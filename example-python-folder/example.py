class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def copy(self):
        return Product(self.name, self.price)


class Inventory:
    def __init__(self, product_list):
        self.products = {}
        for product in product_list:
            self.products[product.name] = product

    def get(self, product_name):
        return self.products[product_name]


class ShoppingCart:
    def __init__(self, inventory, product_names):
        self.products = list(map(inventory.get, product_names))

    def total(self):
        res = 0
        for product in self.products:
            res = res + product.price
        return res

    def apply_discount(self, discount_percent):
        discount_factor = 1 - discount_percent / 100
        for product in self.products:
            product.price = product.price * discount_factor
            pass


def main():
    inventory = Inventory([  # = ⟨𝓲𝓷𝓿𝓮𝓷𝓽𝓸𝓻𝔂.𝘴𝘰𝘮𝘦_𝘮𝘦𝘵𝘩𝘰𝘥(): 𝘢𝘯𝘺⟩ | 4
           # = ⟨𝘱𝘳𝘰𝘥𝘶𝘤𝘵_𝘯𝘢𝘮𝘦𝘴‥.𝘴𝘰𝘮𝘦_𝘮𝘦𝘵𝘩𝘰𝘥(‥): 𝘭𝘪𝘴𝘵⟩
           # = ⟨𝘳𝘦𝘲𝘶𝘦𝘴𝘵𝘴.𝘨𝘦𝘵(‥)‥['𝘮𝘦𝘵𝘢𝘥𝘢𝘵𝘢']: 𝘢𝘯𝘺⟩
           # = ⟨𝘱𝘥.𝘳𝘦𝘢𝘥_𝘤𝘴𝘷(‥): 𝘱𝘥.𝘋𝘢𝘵𝘢𝘍𝘳𝘢𝘮𝘦⟩
           # = ⟨𝘱𝘥.𝘳𝘦𝘢𝘥_𝘤𝘴𝘷(‥)‥['𝘴𝘰𝘮𝘦_𝘤𝘰𝘭𝘶𝘮𝘯']: 𝘱𝘥.𝘚𝘦𝘳𝘪𝘦𝘴⟩
        Product("egg", 3),  # = Inventory₃
           # ⟨class 'Inventory'⟩
           # ⟨bound method 'Inventory.asdf' of Inventory₃⟩
           # 
        Product("milk", 2),  # ⟨𝓲𝓷𝓿𝓮𝓷𝓽𝓸𝓻𝔂.𝓪: 𝘢𝘯𝘺⟩   ⟨𝕡𝕣𝕠𝕕𝕦𝕔𝕥_𝕟𝕒𝕞𝕖𝕤[𝟛]: any⟩   ⟨𝓹𝓻𝓸𝓭𝓾𝓬𝓽_𝓷𝓪𝓶𝓮𝓼: 𝘭𝘪𝘴𝘵⟩ 
    ])
    inventory.metadata = requests.get('...').json()['metadata']
    cart = ShoppingCart(inventory, ["egg", "egg", "egg", "ham"])
    before = cart.total()  # 10
    cart.apply_discount(50)
    after = cart.total()  # 5
