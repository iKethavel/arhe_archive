import { MartialTraitUid, InjureUid, MetamorphosesUid, MysticalAbilitiesUid } from "./uids";

type Deprecated = '0.21'

export type MartialTrait = {
  title: string
  uid: MartialTraitUid
  tier: 2 | 3 | 4 | 5 | 6
  cost: 2 | 3 | 4 | 5 | 6 | 'X'
  requirements?: string
  description: string
  rule: string
  deprecated?: Deprecated
}

export type MartialArt = {
  title: string
  uid: 'classic' | 'high' | 'wild' | 'knight' | 'khimeriya' | 'infernal' | 'shooting' | 'throwing'
  techniques: {
    title: string
    type: string
    cost: string
    effects: string[]
  }[]
  deprecated?: Deprecated
}

export type Madness = {
  uid: string
  title: string
  type: 'diablic' | 'bodily' | 'ideological' | 'social' | 'conspiracy' | 'battle' | 'occult'
  description: string
  deprecated?: Deprecated
}

export type Injury = {
  uid: InjureUid
  title: string
  type: 'memorable' | 'fatal'
  description: string
  deprecated?: Deprecated
}

export type Metamorphose = {
  title: string
  uid: MetamorphosesUid
  description: string
  effects: string[]
  extras: string[]
  deprecated?: Deprecated
}

export type MysticalAbility = {
  title: string
  uid: MysticalAbilitiesUid
  description: string
  effects: {
    cost: number
    ability: string
  }[]
  deprecated?: Deprecated
}

type ItemType = 'general' | 'melee_weapon' | 'missile_weapon' | 'firearms' | 'grenade' | 'armor'

type Item = {
  title: string
  uid: string
  type: ItemType
  weight: number
  minPrice: number
  masteryRank: number
  description: string
  effects: string[]
  capacity: number
  meta?: string[]
  deprecated?: Deprecated
}

export type ItemGeneral = Item & {
  type: 'general'
}

type DamageType = 'absent' | 'minimal' | 'partial' | 'full'
type WeaponSize = 'close' | 'short' | 'normal'

type Weapon = {
  damageType: DamageType
  weaponSize: WeaponSize
  heavyWeapon: number
  lethal: number
  armorPiercing: number
  twoHanded: boolean
  distance: number[]
}

export type ItemMeleeWeapon = Item & Weapon & {
  type: 'melee_weapon'
}

type RangeWeapon = {
  difficulty: number
  hardAim: boolean
}

export type ItemMissileWeapon = Item & Weapon & RangeWeapon & {
  type: 'missile_weapon'
  reload: number
}

export type ItemFirearm = Item & Weapon & RangeWeapon & {
  type: 'firearms'
  misFire: 'simple' | 'increased'
  reload: number
  ammo: number
}

export type ItemGrenade = Item & Weapon & RangeWeapon & {
  type: 'grenade'
}

export type ItemArmor = Item & {
  type: 'armor'
  damageType?: DamageType
  weaponSize?: WeaponSize
  armor: number
  heavyArmor: number
}