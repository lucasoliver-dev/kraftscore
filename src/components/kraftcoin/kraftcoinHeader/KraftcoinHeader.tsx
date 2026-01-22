'use client'

import Link from 'next/link'
import { ArrowUpRight, Coins, Rocket, ShieldCheck } from 'lucide-react'

import Surface from '@/components/layout/surface/Surface'
import Section from '@/components/layout/section/Section'
import { Button } from '@/components/ui/button'

import styles from './kraftcoin-header.module.scss'
import { KraftcoinIcon } from '@/components/icons/kraftcoin'

type KraftcoinHeaderProps = {
  buyHref?: string
}

export function KraftcoinHeader({ buyHref }: KraftcoinHeaderProps) {
  const hasBuyLink = Boolean(buyHref)

  return (
    <Surface variant="hero" glow="strong">
      <Section density="default">
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.left}>
            {/* Mini “chips” usando Button (sem css novo) */}
            <div className={styles.chips}>
              <Button variant="secondary" size="sm" className={styles.chip}>
                <Rocket size={14} />
                Pré-lançamento
              </Button>

              <Button variant="secondary" size="sm" className={styles.chip}>
                <Coins size={14} />
                Solana
              </Button>

              <Button variant="secondary" size="sm" className={styles.chip}>
                <ShieldCheck size={14} />
                Comunidade
              </Button>
            </div>

            {/* Title block */}
            <div className={styles.titleRow}>
              <KraftcoinIcon
                size="2xl"
                className={`${styles.coinIcon} drop-shadow-md`}
              />
              <div className={styles.text}>
                <h1 className={styles.title}>Kraftcoin</h1>
                <p className={styles.subtitle}>
                  A memecoin oficial do KraftScore. Um ativo criado pra
                  fortalecer a comunidade e futuramente liberar benefícios
                  dentro do app.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className={styles.actions}>
              {hasBuyLink ? (
                <Button asChild className={styles.primaryCta}>
                  <Link href={buyHref!} target="_blank" rel="noreferrer">
                    Comprar na pump.fun <ArrowUpRight size={16} />
                  </Link>
                </Button>
              ) : (
                <Button className={styles.primaryCta} disabled>
                  Comprar na pump.fun <ArrowUpRight size={16} />
                </Button>
              )}

              <Button
                className={styles.secondaryCta}
                variant="secondary"
                asChild
              >
                <Link href="/kraftcoin/guide">Entender primeiro</Link>
              </Button>
            </div>

            <p className={styles.disclaimer}>
              * O link oficial será ativado quando a Kraftcoin estiver
              publicada.
            </p>
          </div>

          {/* RIGHT */}
          <div className={styles.right} id="kraftcoin-info">
            <Surface
              glow="soft"
              variant="panel"
              className={styles.specCard}
              data-interactive="true"
            >
              <h3 className={styles.specTitle}>Resumo rápido</h3>

              <div className={styles.specList}>
                <div className={styles.specItem}>
                  <span>Status</span>
                  <b>Pré-lançamento</b>
                </div>

                <div className={styles.specItem}>
                  <span>Plataforma</span>
                  <b>pump.fun</b>
                </div>

                <div className={styles.specItem}>
                  <span>Objetivo</span>
                  <b>Comunidade + utilidade</b>
                </div>

                <div className={styles.specItem}>
                  <span>App</span>
                  <b>KraftScore</b>
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </Section>
    </Surface>
  )
}
